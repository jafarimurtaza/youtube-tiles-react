# build_and_publish.ps1
# Bumps the version, builds dist/, and publishes youtube-tiles-react to npm.
#
# npm will PROMPT for your 6-digit 2FA one-time password (OTP) interactively,
# so no secret is stored in this file. Just run:  .\build_and_publish.ps1
#
# (For fully unattended publishing instead, create a Granular Access Token with
#  "Bypass 2FA" on npmjs.com and store it ONCE in your user file ~/.npmrc as:
#      //registry.npmjs.org/:_authToken=YOUR_TOKEN
#  then this script will publish without prompting. Never put the token here.)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

# 1. Build first so we never bump the version on a broken build.
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed" }

# 2. Bump the patch version (e.g. 0.1.1 -> 0.1.2). npm refuses to republish an
#    existing version. --no-git-tag-version because this folder isn't a git repo.
npm version patch --no-git-tag-version
if ($LASTEXITCODE -ne 0) { throw "version bump failed" }

$version = (Get-Content package.json | ConvertFrom-Json).version
Write-Host "Publishing youtube-tiles-react@$version ..." -ForegroundColor Cyan

# 3. Publish. npm will prompt for your 2FA OTP.
npm publish --access public
if ($LASTEXITCODE -ne 0) { throw "publish failed" }

Write-Host "Published youtube-tiles-react@$version" -ForegroundColor Green
