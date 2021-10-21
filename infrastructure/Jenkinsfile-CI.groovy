pipeline {
    agent any

    environment {
        DOCKER_IMAGE_OTP = 'odh-mentor-otp'
        DOCKER_IMAGE_JOURNEY = 'odh-mentor-otp-journey'
        DOCKER_TAG = "$BUILD_NUMBER"
    }

    stages {
        stage('Configure') {
            steps {
                sh """
                    rm -f .env
                    cp dot.env.example .env
                    echo 'DOCKER_IMAGE_OTP=${DOCKER_IMAGE_OTP}' >> .env
                    echo 'DOCKER_IMAGE_JOURNEY=${DOCKER_IMAGE_JOURNEY}' >> .env
                    echo 'DOCKER_TAG=${DOCKER_TAG}' >> .env
                """
            }
        }
        stage('Build') {
            steps {
                sh '''
                    docker-compose --no-ansi -f infrastructure/docker-compose.build.execute.yml build --pull
                '''
            }
        }
    }
}
