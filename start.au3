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
Global $rdkPid = 0

Global $versionFetched = False

_init()

Global $width = 1000
Global $height = 600
Global $gui = GUICreate($WIN_TITLE, $width, $height, Default, Default, $WS_MAXIMIZEBOX + $WS_MINIMIZEBOX + $WS_SIZEBOX)

$width -= 4
$height -= 26
Global $tab = GUICtrlCreateTab(2, 2, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKLEFT+$GUI_DOCKTOP)

$height -= 20

GUICtrlCreateTabItem("RDK ������̿���̨")
Global $rdkConsole = GUICtrlCreateEdit("", 2, 23, $width, $height, $WS_HSCROLL + $WS_VSCROLL + $ES_WANTRETURN)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
GUICtrlSetFont(-1, 8.5, 0, 0, 'Courier New')
_GUICtrlEdit_SetLimitText($rdkConsole, 3000000000)

GUICtrlCreateTabItem("ת������")
Global $btnApplyRule = GUICtrlCreateButton('Ӧ�ù���', 12, 26)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $nginxConf = GUICtrlCreateEdit("", 12, 54, $width - 18, $height - 36)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
GUICtrlSetFont(-1, 8.5, 0, 0, 'Courier New')

GUICtrlCreateTabItem("���� RDK")
GUICtrlCreateLabel('��ӭʹ�� RDK Windows ��������', 12, 36, 400)
GUICtrlSetFont(-1, 12, $FW_BOLD)
GUICtrlSetResizing(-1, $GUI_DOCKALL)

Global $lbVersion = GUICtrlCreateLabel('�� ��ǰ�汾 ...', 24, 70, 140)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbDownload = GUICtrlCreateLabel ('�������°�', 165, 69)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('�� ��ο�ʼ', 24, 90)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbGetStarted = GUICtrlCreateLabel ('www.rdkapp.com/doc/#best_practise/index.md', 96, 89)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('�� RDK ����', 24, 110)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbSite = GUICtrlCreateLabel ('www.rdkapp.com', 96, 109)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('�� RDK ����', 24, 130)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbGitlab = GUICtrlCreateLabel ('http://gitlab.zte.com.cn/10045812/rdk', 96, 129)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('�� ��������', 24, 150)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbIssue = GUICtrlCreateLabel ('http://gitlab.zte.com.cn/10045812/rdk/issues/new', 96, 149)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('�� ���� Bug', 24, 170)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbBug = GUICtrlCreateLabel ('http://gitlab.zte.com.cn/10045812/rdk/issues/new', 96, 169)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('�� ����Ŀ¼ ' & @ScriptDir, 24, 190)
GUICtrlSetResizing(-1, $GUI_DOCKALL)

GUICtrlCreateTabItem("") ; end tabitem definition

GUISetState(@SW_SHOW)

_startRDK()
_startHTTP()

AdlibRegister('_updateConsole', 100)
OnAutoItExitRegister('_beforeExit')

While 1
	Switch GUIGetMsg()
		Case $GUI_EVENT_CLOSE
			If MsgBox(292, "RDK Server for Windows", "�Ƿ�ر����еķ�����̲��˳���", 0, $gui) == 6 Then Exit
		Case $btnApplyRule
			_applyRules()
		Case $lbGetStarted
			_visitWeb('http://www.rdkapp.com/doc/#best_practise/index.md')
		Case $lbSite
			_visitWeb('http://www.rdkapp.com')
		Case $lbGitlab
			_visitWeb('http://gitlab.zte.com.cn/10045812/rdk')
		Case $lbIssue
			_visitWeb('http://gitlab.zte.com.cn/10045812/rdk/issues/new')
		Case $lbBug
			_visitWeb('http://gitlab.zte.com.cn/10045812/rdk/issues/new')
		Case $lbDownload
			_visitWeb('http://www.rdkapp.com/site/download/index.html')
		Case $tab
			If GUICtrlRead($tab) == 1 Then _initRule()
			If GUICtrlRead($tab) == 2 Then _initVersion()
	EndSwitch
WEnd

Func _initRule()
	If _GUICtrlEdit_GetText($nginxConf) <> '' Then Return
	_GUICtrlEdit_SetText($nginxConf, FileRead(@ScriptDir & '\tools\nginx-1.11.9\conf\rules.conf'))
EndFunc

Func _initVersion()
	If $versionFetched Then Return
	$versionFetched = True
	GUICtrlSetData($lbVersion, '�� ��ǰ�汾 ' & _getVersion())
EndFunc

Func _applyRules()
	Local $tpl = FileRead(@ScriptDir & '\tools\nginx-1.11.9\conf\nginx.conf.tpl')
	Local $idx1 = StringInStr($tpl, '## proxy setting start ##')
	Local $endMark = '## proxy setting end ##'
	Local $idx2 = StringInStr($tpl, $endMark)
	If $idx1 == 0 Or $idx2 == 0 Then Return MsgBox(16+4096, "��������", 'tools\nginx-1.11.9\conf\nginx.conf.tpl ���ƻ�������������RDK����', 0, $gui)

	If MsgBox(292,"RDK����̨","Ӧ�ù�����滻����nginx.conf�ļ��е���ع����Ƿ������", 0, $gui) == 7 Then Return

	Local $conf = StringLeft($tpl, $idx1-1) & @CRLF & _
		_GUICtrlEdit_GetText($nginxConf) & @CRLF & _
		StringMid($tpl, $idx2 + StringLen($endMark))

	FileCopy(@ScriptDir & '\tools\nginx-1.11.9\conf\nginx.conf', @ScriptDir & '\tools\nginx-1.11.9\conf\nginx.conf.bak', 1)
	Local $file = FileOpen(@ScriptDir & '\tools\nginx-1.11.9\conf\nginx.conf', 2)
	FileWrite($file, $conf)
	FileClose($file)

	$file = FileOpen(@ScriptDir & '\tools\nginx-1.11.9\conf\rules.conf', 2)
	FileWrite($file, _GUICtrlEdit_GetText($nginxConf))
	FileClose($file)

	_stopHTTP()
	_startHTTP()
	Sleep(500)
	MsgBox(64,"RDK����̨","ת������Ӧ�óɹ���", 0, $gui)
EndFunc

Func _updateConsole()
	Local $out = StdoutRead($rdkPid)
	If @extended > 0 Then
		$out = _fixConoleText($out)
		_GUICtrlEdit_AppendText($rdkConsole, $out)
	EndIf
EndFunc

Func _fixConoleText($text)
	Return StringRegExpReplace(StringReplace($text, @LF, @CRLF), '\x1b\[\d+m', '')
EndFunc

Func _startHTTP()
	Run('"' & @ScriptDir & '\tools\nginx-1.11.9\nginx.exe"', @ScriptDir & '\tools\nginx-1.11.9\', @SW_HIDE)
EndFunc

Func _startRDK()
	Local $cmd = '"' & $java & '" ' & _readArg() & _
		' -Dfile.encoding=UTF-8 -XX:+UseParallelGC -XX:ParallelGCThreads=2 ' & _
		' -classpath proc/bin/lib/* com.zte.vmax.rdk.Run'

	FileChangeDir(@ScriptDir & '\rdk')
	$rdkPid = Run($cmd, @WorkingDir, @SW_HIDE, $STDOUT_CHILD)
EndFunc

Func _init()
	$java = @WorkingDir & '\proc\bin\jre\bin\java.exe'
	If Not FileExists($java) Then $java = EnvGet ( "JAVA_HOME" ) & '\bin\java.exe'

	If Not FileExists($java) Then
		_error('�Ҳ��� Java1.8 ���л�����' & @CRLF & @CRLF & _
			'�����������' & @CRLF & '�뽫 Java1.8 �����ϵ� Java ���л������������Ŀ¼��'  _
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
	_stopHTTP()
	If $rdkPid <> 0 Then ProcessClose($rdkPid)
	ToolTip('')

	; ɾ��demo����ʱ�ļ�
	DirRemove(@ScriptDir & '\doc\client\demo\tmp', True)
	; ɾ���ϴ����ļ�
	DirRemove(@ScriptDir & '\rdk\upload_files', True)
EndFunc

Func _stopHTTP()
	While ProcessExists('nginx.exe')
		ProcessClose('nginx.exe')
	WEnd
EndFunc


Func _visitWeb($url)
	Run(@ComSpec & " /c " & 'start ' & $url, "", @SW_HIDE)
EndFunc

Func _getVersion()
	ConsoleWrite('get version...' & @CRLF)
	Local $buildFile = FileRead(@ScriptDir & '\rdk\build.sbt')
	Local $match = StringRegExp($buildFile, 'version\s*:=\s*"(.*)"', $STR_REGEXPARRAYGLOBALMATCH)
	Return @error ? 'unknown' : 'V' & $match[0]
EndFunc

Func _error($msg)
	MsgBox(16+4096, "��������", $msg, 0, $gui)
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

