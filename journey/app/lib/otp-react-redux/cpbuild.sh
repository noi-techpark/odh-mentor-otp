echo 'rebuilding..'
yarn prepublish
echo 'copying built js..'
cp -r ./build ../node_modules/otp-react-redux
echo 'done'
