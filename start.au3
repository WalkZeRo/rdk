#include <GUIConstantsEx.au3>
#include <GuiEdit.au3>
#include <WindowsConstants.au3>
#include <Misc.au3>

#AutoIt3Wrapper_Icon=favicon.ico

#NoTrayIcon


Const $WIN_TITLE = 'RDK Server for Windows'

If _Singleton("rdk_console_for_windows", 1) = 0 Then
	_error('�Ѿ���һ������̨�������ˣ�')
	WinActivate($WIN_TITLE)
EndIf



Global $java
Global $httpPid = 0
Global $restPid = 0
Global $rdkPid = 0

_init()
AdlibRegister('_updateConsole', 100)

Global $width = 1000
Global $height = 600
Global $gui = GUICreate($WIN_TITLE, $width, $height, Default, Default, $WS_MAXIMIZEBOX + $WS_MINIMIZEBOX + $WS_SIZEBOX)
GUISetFont(8.5, 0, 0, 'Courier New')

$width -= 4
$height -= 26
GUICtrlCreateTab(2, 2, 200, 0)

GUICtrlCreateTabItem("RDK")
Global $rdkConsole = GUICtrlCreateEdit("", 2, 23, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
_GUICtrlEdit_SetLimitText($rdkConsole, 3000000000)

GUICtrlCreateTabItem("HTTP")
Global $httpConsole = GUICtrlCreateEdit("", 2, 23, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
_GUICtrlEdit_SetLimitText($httpConsole, 3000000000)

GUICtrlCreateTabItem("Rest")
Global $restConsole = GUICtrlCreateEdit("", 2, 23, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
_GUICtrlEdit_SetLimitText($restConsole, 3000000000)

GUICtrlCreateTabItem("") ; end tabitem definition

GUISetState(@SW_SHOW)

_startRDK()
_startHTTP()
_startRest()

OnAutoItExitRegister('_beforeExit')

While 1
	If GUIGetMsg() <> $GUI_EVENT_CLOSE Then ContinueLoop

	If MsgBox(292, "RDK Server for Windows", "�Ƿ�ر����еķ�����̲��˳���", 0, $gui) == 6 Then Exit
WEnd

Func _updateConsole()
	_updateConsoleDo($rdkPid, $rdkConsole)
	_updateConsoleDo($httpPid, $httpConsole)
	_updateConsoleDo($restPid, $restConsole)
EndFunc

Func _updateConsoleDo($pid, $console)
	Local $out = StdoutRead($pid)
	If @extended > 0 Then
		$out = _fixConoleText($out)
		_GUICtrlEdit_AppendText($console, $out)
	EndIf
EndFunc

Func _fixConoleText($text)
	Return StringRegExpReplace(StringReplace($text, @LF, @CRLF), '\x1b\[\d+m', '')
EndFunc

Func _startHTTP()
	FileChangeDir(@ScriptDir & '\tools\http_server\')
	$httpPid = Run("node server.js", "", @SW_HIDE, $STDERR_MERGED)
;~ 	ConsoleWrite($httpPid & @CRLF)
EndFunc

Func _startRest()
	FileChangeDir(@ScriptDir & '\doc\tools\live_demo\mock_rest\')
	$restPid = Run("node rest_service.js", "", @SW_HIDE, $STDERR_MERGED)
;~ 	ConsoleWrite($restPid & @CRLF)
EndFunc

Func _startRDK()
	Local $cmd = '"' & $java & '" ' & _readArg() & _
		' -Dfile.encoding=UTF-8 -XX:+UseParallelGC -XX:ParallelGCThreads=2 ' & _
		' -classpath proc/bin/lib/* com.zte.vmax.rdk.Run'
;~ 	ConsoleWrite($cmd & @CRLF)

	FileChangeDir(@ScriptDir & '\rdk')
	$rdkPid = Run($cmd, @WorkingDir, @SW_HIDE, $STDOUT_CHILD)
;~ 	ConsoleWrite('$rdkPid=' & $rdkPid & @CRLF)
EndFunc

Func _init()
	Local $pid = Run('node --version', @WorkingDir, @SW_HIDE)
	If $pid == 0 Then
		_error('���Ȱ�װnodejs�����л�����' & @CRLF & @CRLF & _
				'���ص�ַ��' & @CRLF & 'http://10.9.233.35:8080/tools/node-v5.10.1-x86.msi' & @CRLF & @CRLF & _
				'Ctrl+C �ɸ������ӡ�')
	EndIf

	$java = @WorkingDir & '\proc\bin\jre\bin\java.exe'
	If Not FileExists($java) Then $java = EnvGet ( "JAVA_HOME" ) & '\bin\java.exe'

	If Not FileExists($java) Then
		_error('�Ҳ��� Java1.8 ���л�����' & @CRLF & @CRLF & _
			'�����������' & @CRLF & '�뽫 Java1.8 ���л������������Ŀ¼��'  _
			& @WorkingDir & '\proc\bin\jre' & @CRLF & _
			'���� ��ȷ���� JAVA_HOME ����������ֵ��')
	EndIf

	ToolTip('���ڼ�� JRE �汾������', @DesktopWidth/2, @DesktopHeight/2-50, '', 0, 2)
	$pid = Run(@ComSpec & " /c " & '"' & $java & '" -version', "", @SW_HIDE, $STDERR_CHILD)
	ProcessWaitClose($pid)
	ToolTip('')
	Local $version = Number(StringMid(StderrRead($pid), 15, 3))
	If $version < 1.8 Then
		_error('��ǰ Java ���л����汾(' & $version & ') �汾���ͣ�������Ҫ JRE1.8 ���ϵİ汾��')
	EndIf

	Local $jreOpt = ''
	If $cmdLine[0] > 0 Then
		For $i = 1 To $cmdLine[0]
			$jreOpt &= $cmdLine[$i] & ' '
		Next
	Else
		$jreOpt = InputBox("RDK for Windows", "���� RDK ����������" & @CRLF & _
				"�����֪����ɶ�õģ���ʹ��Ĭ��ֵ��������", _readArg()," ","350","150")
		If @error == 1 Or @error == 3 Then Exit
	EndIf
	_saveArg($jreOpt)
EndFunc

Func _beforeExit()
	ToolTip('���ڹرպ�̨���̣����Ժ򡣡���', @DesktopWidth/2, @DesktopHeight/2-50, '', 0, 2)
	If $httpPid <> 0 Then ProcessClose($httpPid)
	If $restPid <> 0 Then ProcessClose($restPid)
	If $rdkPid <> 0 Then ProcessClose($rdkPid)
	ToolTip('')
EndFunc

Func _error($msg)
	MsgBox(16+4096, "��������", $msg)
	Exit 0
EndFunc

Func _readArg()
	Local $arg = StringStripWS(FileRead(_getConfigFileName()), 3)
	Return $arg == '' ? '-Xms64m -Xmx256m' : $arg;
EndFunc

Func _saveArg($arg)
	Local $file = FileOpen(_getConfigFileName(), $FO_OVERWRITE)
	FileWrite($file, $arg)
EndFunc

Func _getConfigFileName()
	Return StringLeft(@ScriptFullPath, StringInStr(@ScriptFullPath, '.', 0, -1) - 1) & '.cfg'
EndFunc

