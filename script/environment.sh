#!/bin/bash

# 获取当前分支
currentBranch=`git branch | grep \*`
envFile=".env"

echo "current branch: $currentBranch"
echo "overwrite file: $envFile"

# 测试环境配置
if [[ $currentBranch =~ "test" ]]; then
    sed -i "s|https://api.xxx.com|http://api.test.xxx.com|g" ${envFile};
# elif ….; then

# else

fi