import * as ApplyAction from '../constant/applyConstant';

export const AddApplyRequest = (
  userId: string,
  progId: string,
  payload: any
) => ({
  type: ApplyAction.CREATE_APPLY_REQ,
  payload: { userId, progId, payload },
});

export const AddApplySuccess = (payload: any) => ({
  type: ApplyAction.CREATE_APPLY_OK,
  payload,
});

export const AddApplyFailed = (payload: any) => ({
  type: ApplyAction.CREATE_APPLY_FAILED,
  payload,
});
