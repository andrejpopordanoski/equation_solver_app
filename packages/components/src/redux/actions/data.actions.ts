// created with createNewAction.sh
import { MER_PREDICT } from 'components/src/redux/constants/main.constants';
// created with createNewAction.sh
import { MER_PREDICT_API } from 'components/src/services/api';
// created with createNewAction.sh
import { CROP_IMAGE } from 'components/src/redux/constants/main.constants';
// created with createNewAction.sh
import { CROP_IMAGE_API } from 'components/src/services/api';
import { getAction, postAction } from 'components/src/services/actions-service/actionHelpers';
// created with createNewAction.sh
export const cropImage = (image: string | Blob, x: number, y: number, width: number, height: number) => async (dispatch: any) => {
    const data = new FormData();

    data.append('image', image);
    data.append('x', x);
    data.append('y', y);
    data.append('width', width);
    data.append('height', height);
    postAction(dispatch, CROP_IMAGE, CROP_IMAGE_API(), data);
};
// created with createNewAction.sh
export const getMerPrediction = (image: any) => async (dispatch: any) => {
    postAction(dispatch, MER_PREDICT, MER_PREDICT_API(), { image });
};
