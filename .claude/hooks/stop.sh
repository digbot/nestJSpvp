#!/bin/bash

powershell.exe -NoProfile -Command "
Add-Type -AssemblyName System.Windows.Forms
\$balloon = New-Object System.Windows.Forms.NotifyIcon
\$balloon.Icon = [System.Drawing.SystemIcons]::Information
\$balloon.BalloonTipIcon = 'Info'
\$balloon.BalloonTipTitle = 'Claude Code'
\$balloon.BalloonTipText = 'Claude has finished!'
\$balloon.Visible = \$true
\$balloon.ShowBalloonTip(4000)
Start-Sleep -Seconds 4
\$balloon.Dispose()
" 2>/dev/null || true
