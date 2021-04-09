pipeline {
    agent any

    environment {
        DOCKER_PROJECT_NAME = "odh-mentor-otp"
        DOCKER_IMAGE_OTP = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-otp'
        DOCKER_IMAGE_JOURNEY = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-journey'
        DOCKER_IMAGE_GBFS = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-gbfs'
        DOCKER_IMAGE_GEOCODER = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-geocoder'
        DOCKER_IMAGE_CARSHARING = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-carsharing'
        DOCKER_IMAGE_PARKING = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-parking'
        DOCKER_TAG = "test-$BUILD_NUMBER"

        SERVER_PORT_OTP = "1014"
        SERVER_PORT_JOURNEY = "1015"
        GBFS_HOST ="https://gbfs.otp.opendatahub.testingmachine.eu/"
        DOCKER_GBFS_PORT = "1016"
        DOCKER_GEOCODER_PORT = "1017"
        DOCKER_CARSHARING_PORT= "1018"
        DOCKER_PARKING_PORT= "1019"

        JAVA_MX = "2G"
        BUILD_GRAPH = "False"
        DOWNLOAD_DATA = "False"
        BACKUP_GRAPH = "False"

        OTP_RR_BRANCH = "mentor-meran"
        OTP_UI_BRANCH = "master"
        API_HOST = "https://otp.opendatahub.testingmachine.eu"
        API_PORT = "443"
        API_PATH = "/otp/routers/openmove"

        GEOCODER_BASEURL = "https://geocoder.otp.opendatahub.testingmachine.eu/v1"
        OFFICIAL = "False"
        GBFS_VERSION=1
        CARSHARING_HOST="https://carsharing.otp.opendatahub.testingmachine.eu/"
    }

    stages {
        stage('Configure') {
            steps {
                sh """
                    rm -f .env
                    cp .env.example .env
                    echo 'COMPOSE_PROJECT_NAME=${DOCKER_PROJECT_NAME}' > .env
                    echo 'DOCKER_IMAGE_OTP=${DOCKER_IMAGE_OTP}' >> .env
                    echo 'DOCKER_IMAGE_JOURNEY=${DOCKER_IMAGE_JOURNEY}' >> .env
                    echo 'DOCKER_IMAGE_GBFS=${DOCKER_IMAGE_GBFS}' >> .env
                    echo 'DOCKER_IMAGE_GEOCODER=${DOCKER_IMAGE_GEOCODER}' >> .env
                    echo 'DOCKER_IMAGE_CARSHARING=${DOCKER_IMAGE_CARSHARING}' >> .env
                    echo 'DOCKER_IMAGE_PARKING=${DOCKER_IMAGE_PARKING}' >> .env
                    echo 'DOCKER_TAG=${DOCKER_TAG}' >> .env

                    echo 'SERVER_PORT_OTP=${SERVER_PORT_OTP}' >> .env
                    echo 'SERVER_PORT_JOURNEY=${SERVER_PORT_JOURNEY}' >> .env

                    echo 'JAVA_MX=${JAVA_MX}' >> .env
                    echo 'BUILD_GRAPH=${BUILD_GRAPH}' >> .env
                    echo 'DOWNLOAD_DATA=${DOWNLOAD_DATA}' >> .env
                    echo 'BACKUP_GRAPH=${BACKUP_GRAPH}' >> .env

                    echo 'API_HOST=${API_HOST}' >> .env
                    echo 'API_HOST=${API_PORT}' >> .env
                    echo 'API_HOST=${API_PATH}' >> .env

                    echo 'OTP_RR_BRANCH=${OTP_RR_BRANCH}' >> .env
                    echo 'OTP_UI_BRANCH=${OTP_UI_BRANCH}' >> .env
                    echo 'GBFS_HOST=${GBFS_HOST}' >> .env
                    echo 'DOCKER_GBFS_PORT="${DOCKER_GBFS_PORT}"' >> .env
                    echo 'GEOCODER_BASEURL="${GEOCODER_BASEURL}"' >> .env
                    echo 'DOCKER_GEOCODER_PORT=${DOCKER_GEOCODER_PORT}' >> .env
                    echo 'OFFICIAL=${OFFICIAL}' >> .env
                    echo 'GBFS_VERSION=${GBFS_VERSION}' >> .env
                    echo 'CARSHARING_HOST=${CARSHARING_HOST}' >> .env
                    echo 'DOCKER_CARSHARING_PORT=${DOCKER_CARSHARING_PORT}' >> .env
                    echo 'DOCKER_PARKING_PORT=${DOCKER_PARKING_PORT}' >> .env
                """
            }
        }
        stage('Build') {
            steps {
                sh '''
                    aws ecr get-login --region eu-west-1 --no-include-email | bash
                    docker-compose --no-ansi -f infrastructure/docker-compose.build.execute.yml build --pull
                    docker-compose --no-ansi -f infrastructure/docker-compose.build.execute.yml push
                '''
            }
        }
        stage('Deploy') {
            steps {
               sshagent(['jenkins-ssh-key']) {
                    sh """
                        (cd infrastructure/ansible && ansible-galaxy install -f -r requirements.yml)
                        (cd infrastructure/ansible && ansible-playbook --limit=test deploy.execute.yml --extra-vars "release_name=${BUILD_NUMBER}")
                    """
                }
            }
        }
    }
}
