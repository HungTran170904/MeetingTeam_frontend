def originalRepoUrl ='https://github.com/HungTran170904'

def sourceRepo = "${originalRepoUrl}/MeetingTeam_frontend.git"
def sourceBranch = 'main'

def k8SRepoName = "MeetingTeam_K8S"
def k8SRepo = "${originalRepoUrl}/${k8SRepoName}.git"
def k8SBranch = 'main'
def helmPath = "${k8SRepoName}/application/frontend"
def helmValueFile = "values.yaml"

def dockerhubAccount = 'dockerhub'
def githubAccount = 'github'

def dockerfilePath = './'
def version = "v2.${BUILD_NUMBER}"

pipeline{
          agent {
                    kubernetes {
                              inheritFrom 'nodejs-template'
                    }                 
          }

          environment {
                    DOCKER_REGISTRY = 'https://registry-1.docker.io'
                    DOCKER_IMAGE_NAME = 'hungtran679/mt-frontend'
          }

          stages{
                    stage('test stage'){
                              steps{
                                        container('nodejs'){
                                                  sh 'npm install'
                                                  sh 'npm test'
                                        }
                              }
                    }
                    stage('build stage'){
                              steps{
                                        container('nodejs'){
                                                  sh 'npm run build'
                                        }
                              }
                    }
                    stage('build and push image'){
                              when{ branch 'main' }
                              steps{
                                        container('docker'){
                                                  script{
                                                            app = docker.build(DOCKER_IMAGE_NAME, dockerfilePath)
                                                            docker.withRegistry(DOCKER_REGISTRY, dockerhubAccount ) {
                                                                      app.push(version)
                                                            }
                                                  }
                                        }
                              }
                    }
                    stage('update k8s repo'){
                              when{ branch 'main' }
                              steps {
				withCredentials([
                                                  usernamePassword(
                                                            credentialsId: githubAccount, 
                                                            passwordVariable: 'GIT_PWD', 
                                                            usernameVariable: 'GIT_USER'
                                                  )
                                        ]) {
                                                  sh """#!/bin/bash
                                                            git clone ${k8SRepo} --branch ${k8SBranch}
                                                            cd ${helmPath}
                                                            sed -i 's|  tag: .*|  tag: "${version}"|' ${helmValueFile}

                                                            git config --global user.email "kobiet@gmail.com"
                                                            git config --global user.name "TeoTran"
                                                            git add . 
                                                            git commit -m "feat: update to version ${version}"
                                                            git push https://${GIT_USER}:${GIT_PWD}@github.com/HungTran170904/${k8SRepoName}.git
                                                            """		
				}				
                              }
                    }
          }
}