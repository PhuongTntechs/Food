import RNFetchBlob from 'react-native-fetch-blob';
import Init from '../Init';

const { webUriUpload } = Init;

const upload = data =>
  RNFetchBlob.fetch('POST', webUriUpload, {
    Authorization: 'Bearer access-token',
    otherHeader: 'foo',
    'Content-Type': 'multipart/form-data',
  }, data);

module.exports = upload;
