pipeline {
    agent any

    environment {
        DOCKER_PROJECT_NAME = "odh-mentor-otp-prod"
        DOCKER_IMAGE_OTP = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-otp'
        DOCKER_IMAGE_JOURNEY = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-journey'
        DOCKER_IMAGE_GBFS = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-gbfs'
        DOCKER_IMAGE_GEOCODER = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-geocoder'
        DOCKER_IMAGE_CARSHARING = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-carsharing'
        DOCKER_IMAGE_PARKING = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-parking'
        DOCKER_IMAGE_ECHARGING = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-echarging'
        DOCKER_IMAGE_DRT = '755952719952.dkr.ecr.eu-west-1.amazonaws.com/odh-mentor-otp-execute-drt'
        DOCKER_TAG = "prod-execute-$BUILD_NUMBER"

        EFS_FOLDER = "/opt/odh-mentor-otp-prod/"

        SERVER_PORT_OTP = "1080"
        SERVER_PORT_JOURNEY = "1081"
        GBFS_HOST ="https://gbfs.otp.opendatahub.bz.it/"
        DOCKER_GBFS_PORT = "1082"
        DOCKER_GEOCODER_PORT = "1083"
        DOCKER_CARSHARING_PORT = "1084"
        DOCKER_PARKING_PORT = "1085"
        DOCKER_DRT_PORT = "1086"
        DOCKER_ECHARGING_PORT = "1087"

        JAVA_MX = "16G"
        BUILD_GRAPH = "False"
        DOWNLOAD_DATA = "False"
        BACKUP_GRAPH = "False"

        OTP_RR_BRANCH = "mentor-meran"
        OTP_UI_BRANCH = "master"
        API_HOST = "https://otp.opendatahub.bz.it"
        API_PORT = "443"
        API_PATH = "/otp/routers/openmove"

        HERE_APPID=credentials("otp-here-appid-prod")
        HERE_APPCODE=credentials("otp-here-appcode-prod")

        GEOCODER_BASEURL = "https://geocoder.otp.opendatahub.bz.it/v1"
        PARKING_BASEURL = "https://parking.otp.opendatahub.bz.it"
        DRT_BASEURL = "https://drt.otp.opendatahub.bz.it"
        CHARGER_BASEURL = "https://charger.otp.opendatahub.bz.it"
        CARSHARING_BASEURL = "https://carsharing.otp.opendatahub.bz.it"
        OFFICIAL = "False"
        GBFS_VERSION=1
        CARSHARING_HOST="https://carsharing.otp.opendatahub.bz.it/"
        PARKING_HOST="https://parking.otp.opendatahub.bz.it/"
        DRT_HOST="https://drt.otp.opendatahub.bz.it/"
        CHARGER_HOST="https://charger.otp.opendatahub.bz.it/"
        
        GTFS_URL="ftp://ftp.sta.bz.it/gtfs/google_transit_shp.zip"
        GTFS_URL_UPDATETIME="0 4 * * *"
        GTFS_URL_UPDATEHOOK="https://jenkins.testingmachine.eu/job/it.bz.opendatahub.otp/job/calculate.prod-deploy.trigger/build?token="
        JENKINSURL_TOKEN=credentials("calculate.test-deploy.trigger-authtoken")
        JENKINS_TRIGGER_PSWD=credentials("otp-jenkins-trigger-pswd")
        JENKINS_TRIGGER_USER=credentials("otp-jenkins-trigger-user")
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
                    echo 'DOCKER_IMAGE_DRT=${DOCKER_IMAGE_DRT}' >> .env
                    echo 'DOCKER_IMAGE_ECHARGING=${DOCKER_IMAGE_ECHARGING}' >> .env
                    echo 'DOCKER_TAG=${DOCKER_TAG}' >> .env

                    echo 'SERVER_PORT_OTP=${SERVER_PORT_OTP}' >> .env
                    echo 'SERVER_PORT_JOURNEY=${SERVER_PORT_JOURNEY}' >> .env

                    echo 'EFS_FOLDER=${EFS_FOLDER}' >> .env

                    echo 'JAVA_MX=${JAVA_MX}' >> .env
                    echo 'BUILD_GRAPH=${BUILD_GRAPH}' >> .env
                    echo 'DOWNLOAD_DATA=${DOWNLOAD_DATA}' >> .env
                    echo 'BACKUP_GRAPH=${BACKUP_GRAPH}' >> .env

                    echo 'API_HOST=${API_HOST}' >> .env
                    echo 'API_HOST=${API_PORT}' >> .env
                    echo 'API_HOST=${API_PATH}' >> .env

                    echo 'HERE_APPID=${HERE_APPID}' >> .env
                    echo 'HERE_APPCODE=${HERE_APPCODE}' >> .env

                    echo 'OTP_RR_BRANCH=${OTP_RR_BRANCH}' >> .env
                    echo 'OTP_UI_BRANCH=${OTP_UI_BRANCH}' >> .env
                    echo 'GBFS_HOST=${GBFS_HOST}' >> .env
                    echo 'GEOCODER_BASEURL="${GEOCODER_BASEURL}"' >> .env
                    echo 'PARKING_BASEURL="${PARKING_BASEURL}"' >> .env
                    echo 'DRT_BASEURL="${DRT_BASEURL}"' >> .env
                    echo 'CHARGER_BASEURL="${CHARGER_BASEURL}"' >> .env
                    echo 'CARSHARING_BASEURL="${CARSHARING_BASEURL}"' >> .env
                    echo 'DOCKER_GEOCODER_PORT=${DOCKER_GEOCODER_PORT}' >> .env
                    echo 'OFFICIAL=${OFFICIAL}' >> .env
                    echo 'GBFS_VERSION=${GBFS_VERSION}' >> .env
                    echo 'CARSHARING_HOST=${CARSHARING_HOST}' >> .env
                    echo 'PARKING_HOST=${PARKING_HOST}' >> .env
                    echo 'DRT_HOST=${DRT_HOST}' >> .env
                    echo 'CHARGER_HOST=${CHARGER_HOST}' >> .env
                    echo 'DOCKER_CARSHARING_PORT=${DOCKER_CARSHARING_PORT}' >> .env
                    echo 'DOCKER_PARKING_PORT=${DOCKER_PARKING_PORT}' >> .env
                    echo 'DOCKER_GBFS_PORT=${DOCKER_GBFS_PORT}' >> .env
                    echo 'DOCKER_DRT_PORT=${DOCKER_DRT_PORT}' >> .env
                    echo 'DOCKER_ECHARGING_PORT=${DOCKER_ECHARGING_PORT}' >> .env
                    
                    echo 'GTFS_URL="${GTFS_URL}"' >> .env
                    echo 'GTFS_URL_UPDATETIME="${GTFS_URL_UPDATETIME}"' >> .env
                    echo 'GTFS_URL_UPDATEHOOK="${GTFS_URL_UPDATEHOOK}${JENKINSURL_TOKEN}"' >> .env
                    echo 'GTFS_UPDATEHOOK_USER="${JENKINS_TRIGGER_USER}:${JENKINS_TRIGGER_PSWD}"' >> .env
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
                        (cd infrastructure/ansible && ansible-playbook --limit=prod deploy.execute.yml --extra-vars "release_name=${BUILD_NUMBER}")
                    """
                }
            }
        }
    }
}
