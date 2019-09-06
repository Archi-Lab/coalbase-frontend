node {
  def repository = "nexus.docker.archi-lab.io/archilab"
  def image
  def tag = "${env.BUILD_NUMBER}"

  stage('Checkout') {
    checkout scm
  }

  docker.image('node:12.9-alpine').inside {
    sh 'apk -U add openjdk8-jre'
    sh 'npm install typescript'

    stage('Test') {
      echo "Should test the project here!"
    }

    stage("Quality Check") {
      def scannerHome = tool 'SonarQube Scanner';
      withSonarQubeEnv('SonarQube-Server') {
        sh "${scannerHome}/bin/sonar-scanner"
      }
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
    def packageJSON = readJSON file: 'package.json'
    image = packageJSON.name

    sh "docker build -t ${repository}/${image}:${tag} ."

    docker.withRegistry('https://docker.nexus.archi-lab.io//', 'archilab-nexus-jenkins') {
      sh "docker push ${repository}/${image}:${tag}"
    }
  }

  stage('Deploy') {
    docker.withServer('tcp://10.10.10.51:2376', 'coalbase-prod-certs') {
      docker.withRegistry('https://docker.nexus.archi-lab.io//', 'archilab-nexus-jenkins') {
        sh "env REPOSITORY=${repository} IMAGE=${image} TAG=${tag} docker stack deploy \
          --with-registry-auth -c ./docker-compose.yml ${image}"
      }
    }
  }
}
