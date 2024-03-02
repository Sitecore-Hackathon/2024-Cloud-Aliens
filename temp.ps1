$DOCKER_CONFIG = $env:DOCKER_CONFIG
if (-not $DOCKER_CONFIG) {
	    $DOCKER_CONFIG = Join-Path $env:USERPROFILE ".docker"
}


$cliPluginsDir = Join-Path $DOCKER_CONFIG "cli-plugins"
if (-not (Test-Path $cliPluginsDir)) {
New-Item -ItemType Directory -Path $cliPluginsDir | Out-Null
}

$composeUrl = "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-windows-x86_64.exe"
$composePath = Join-Path $cliPluginsDir "docker-compose.exe"
Invoke-WebRequest -Uri $composeUrl -OutFile $composePath

