node {
  stage('Checkout') {
    checkout scm
  }

  docker.image('maven:3.6.1-jdk-8-alpine').inside {
    writeFile file: 'settings.xml',
      text: "<settings><localRepository>${pwd()}/.m2</localRepository></settings>"

    stage('Test') {
      echo "Should test the project here!"
    }

    try {
      stage("Quality Check") {
        withSonarQubeEnv('SonarQube-Server') {
          sh 'mvn -B -s settings.xml \
                    org.sonarsource.scanner.maven:sonar-maven-plugin:3.6.0.1398:sonar'
        }
      }
    } finally {
      recordIssues enabledForFailure: true, aggregatingResults: true,
        tool: checkStyle(pattern: 'checkstyle-result.xml')
    }
  }

  stage("Quality Gate") {
    timeout(time: 10, unit: "MINUTES") {
      def qg = waitForQualityGate()
      
      if (qg.status != "OK") {
        error "Pipeline aborted due to quality gate failure: ${qg.status}"
      }
    }
  }
  stage('Build') {
    sh "docker build -t docker.nexus.archi-lab.io/archilab/coalbase-frontend ."
    sh "docker tag docker.nexus.archi-lab.io/archilab/coalbase-frontend \
      docker.nexus.archi-lab.io/archilab/coalbase-frontend:${env.BUILD_ID}"
    docker.withRegistry('https://docker.nexus.archi-lab.io//', 'archilab-nexus-jenkins') {
      sh "docker push docker.nexus.archi-lab.io/archilab/coalbase-frontend"
    }
  }

  stage('Deploy') {
    docker.withServer('tcp://10.10.10.51:2376', 'coalbase-prod-certs') {
      docker.withRegistry('https://docker.nexus.archi-lab.io//', 'archilab-nexus-jenkins') {
        sh 'docker stack deploy --with-registry-auth -c ./docker-compose.yml frontend'
      }
    }
  }
}
