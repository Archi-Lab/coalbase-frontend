pipeline {
    agent any
    tools{
      nodejs "nodejs8111"
    }

    stages {
        stage('Test') {
            steps {
              echo "should test the project here!"
            }
            post {
                success {
                    updateGitlabCommitStatus name: "Test", state: "success"
                }
                failure {
                    updateGitlabCommitStatus name: "Test", state: "failed"
                }
                unstable {
                    updateGitlabCommitStatus name: "Test", state: "success"
                }
            }
        }
        stage("Quality Check") {
            steps {
                script { scannerHome = tool "SonarQube Scanner"; }
                withSonarQubeEnv("SonarQube-Server") { sh "${scannerHome}/bin/sonar-scanner" }
            }
            post {
                always {
                    step([$class: "hudson.plugins.checkstyle.CheckStylePublisher", pattern: "**/target/checkstyle-result.xml", unstableTotalAll: "100"])
                }
            }
        }
        stage("Quality Gate") {
            steps {
                script {
                    timeout(time: 10, unit: "MINUTES") {
                        // Just in case something goes wrong, pipeline will be killed after a timeout
                        def qg = waitForQualityGate()
                        // Reuse taskId previously collected by withSonarQubeEnv
                        if (qg.status != "OK") {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                updateGitlabCommitStatus name: "Building", state: "running"
                sh "docker build -t docker.nexus.archi-lab.io/archilab/coalbase-frontend ."
                sh "docker tag docker.nexus.archi-lab.io/archilab/coalbase-frontend docker.nexus.archi-lab.io/archilab/coalbase-frontend:${env.BUILD_ID}"
                script {
                  docker.withRegistry('https://docker.nexus.archi-lab.io//', 'archilab-nexus-jenkins-user') {
                    sh "docker push docker.nexus.archi-lab.io/archilab/coalbase-frontend"
                  }
                }
            }
            post {
                success {
                    updateGitlabCommitStatus name: "Building", state: "success"
                }
                failure {
                    updateGitlabCommitStatus name: "Building", state: "failed"
                }
                unstable {
                    updateGitlabCommitStatus name: "Building", state: "success"
                }
            }
        }
        stage('Deploy') {
            steps {
                updateGitlabCommitStatus name: "Deploy", state: "running"
                script {
                  docker.withServer('tcp://10.10.10.25:2376', 'CoalbaseVM') {
                    docker.withRegistry('https://docker.nexus.archi-lab.io//', 'archilab-nexus-jenkins-user') {
                      sh 'docker stack deploy --with-registry-auth -c ./docker-compose.yml frontend'
                    }
                  }
                }
            }
            post {
                success {
                    updateGitlabCommitStatus name: "Deploy", state: "success"
                }
                failure {
                    updateGitlabCommitStatus name: "Deploy", state: "failed"
                }
                unstable {
                    updateGitlabCommitStatus name: "Deploy", state: "success"
                }
            }
        }
    }
}
