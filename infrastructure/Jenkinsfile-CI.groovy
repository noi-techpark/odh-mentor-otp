pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'odh-mentor-otp'
        DOCKER_TAG = "$BUILD_NUMBER"
    }

    stages {
        stage('Configure') {
            steps {
                sh """
                    rm -f .env
                    cp .env.example .env
                    echo 'DOCKER_IMAGE=${DOCKER_IMAGE}' >> .env
                    echo 'DOCKER_TAG=${DOCKER_TAG}' >> .env
                """
            }
        }
        stage('Build') {
            steps {
                sh '''
                    docker-compose --no-ansi -f infrastructure/docker-compose.build.yml build --pull
                '''
            }
        }
    }
}
