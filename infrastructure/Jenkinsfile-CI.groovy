pipeline {
    agent any

    environment {
        DOCKER_IMAGE_OTP = 'odh-mentor-otp'
        DOCKER_IMAGE_JOURNEY = 'odh-mentor-otp-journey'
        DOCKER_IMAGE_GBFS = 'odh-mentor-otp-gbfs'
        DOCKER_IMAGE_GEOCODER = 'odh-mentor-otp-geocoder'
        DOCKER_IMAGE_CARSHARING = 'odh-mentor-otp-carsharing'
        DOCKER_IMAGE_PARKING = 'odh-mentor-otp-parking'
        DOCKER_IMAGE_ECHARGING = 'odh-mentor-otp-echarging'
        DOCKER_IMAGE_DRT = 'odh-mentor-otp-drt'
        DOCKER_TAG = "$BUILD_NUMBER"
    }

    stages {
        stage('Configure') {
            steps {
                sh """
                    rm -f .env
                    cp .env.example .env
                    echo 'DOCKER_IMAGE_OTP=${DOCKER_IMAGE_OTP}' >> .env
                    echo 'DOCKER_IMAGE_JOURNEY=${DOCKER_IMAGE_JOURNEY}' >> .env
                    echo 'DOCKER_IMAGE_GBFS=${DOCKER_IMAGE_GBFS}' >> .env
                    echo 'DOCKER_IMAGE_GEOCODER=${DOCKER_IMAGE_GEOCODER}' >> .env
                    echo 'DOCKER_IMAGE_CARSHARING=${DOCKER_IMAGE_CARSHARING}' >> .env
                    echo 'DOCKER_IMAGE_PARKING=${DOCKER_IMAGE_PARKING}' >> .env
                    echo 'DOCKER_IMAGE_DRT=${DOCKER_IMAGE_DRT}' >> .env
                    echo 'DOCKER_IMAGE_ECHARGING=${DOCKER_IMAGE_ECHARGING}' >> .env
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
