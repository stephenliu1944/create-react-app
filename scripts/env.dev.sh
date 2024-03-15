#!/bin/bash

# 获取当前分支
currentBranch=`git branch | grep \*`
envFile="webpack.config.base.js"

echo "current branch: $currentBranch"
echo "overwrite file: $envFile"

# 开发环境配置
sed -i "s|.env.production|.env.development|g" ${envFile};