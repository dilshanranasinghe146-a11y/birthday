$port = 3000
$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.*" } | Select-Object -First 1).IPAddress
if (-not $localIP) { $localIP = "127.0.0.1" }
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Birthday Site is RUNNING!" -ForegroundColor Yellow
Write-Host "  On this PC:    http://localhost:$port" -ForegroundColor Green
Write-Host "  On your PHONE: http://${localIP}:$port" -ForegroundColor Magenta
Write-Host "  Same Wi-Fi required on phone!" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host "=============================================" -ForegroundColor Cyan
Start-Process "http://localhost:$port/open-on-phone.html"
function Get-Mime($e) { switch($e.ToLower()){".html"{"text/html; charset=utf-8"}".css"{"text/css"}".js"{"application/javascript"}".png"{"image/png"}".jpg"{"image/jpeg"}".jpeg"{"image/jpeg"}".gif"{"image/gif"}".svg"{"image/svg+xml"}".ico"{"image/x-icon"}".mp3"{"audio/mpeg"}".mp4"{"video/mp4"}".webp"{"image/webp"}".woff2"{"font/woff2"}default{"application/octet-stream"}} }
$ep = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any,$port)
$srv = New-Object System.Net.Sockets.TcpListener($ep)
try { $srv.Start(); Write-Host "Server running on port $port" -ForegroundColor Green } catch { Write-Host "ERROR: $_" -ForegroundColor Red; Read-Host; exit }
while($true){
 try{
  if(-not $srv.Pending()){Start-Sleep -Milliseconds 50;continue}
  $cl=$srv.AcceptTcpClient(); $st=$cl.GetStream()
  $buf=New-Object byte[] 8192; $n=$st.Read($buf,0,$buf.Length)
  $req=[System.Text.Encoding]::UTF8.GetString($buf,0,$n)
  $rl=($req -split "`r`n")[0]; $pt=($rl -split " ")
  $up=if($pt.Count -ge 2){$pt[1]}else{"/"}
  $up=($up -split "\?")[0]; if($up -eq "/" -or $up -eq ""){$up="/index.html"}
  $fp=Join-Path $rootPath ($up.TrimStart("/").Replace("/","\"))
  if(Test-Path $fp -PathType Leaf){
   $ext=[System.IO.Path]::GetExtension($fp); $mime=Get-Mime $ext
   $body=[System.IO.File]::ReadAllBytes($fp)
   $hdr="HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
   $hb=[System.Text.Encoding]::UTF8.GetBytes($hdr); $st.Write($hb,0,$hb.Length); $st.Write($body,0,$body.Length)
   Write-Host "  [OK] $up" -ForegroundColor DarkGreen
  }else{
   $body=[System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1>")
   $hdr="HTTP/1.1 404 Not Found`r`nContent-Type: text/html`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
   $hb=[System.Text.Encoding]::UTF8.GetBytes($hdr); $st.Write($hb,0,$hb.Length); $st.Write($body,0,$body.Length)
  }
  $st.Flush(); $st.Close(); $cl.Close()
 }catch{}
}
