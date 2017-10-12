export const AUTH_INIT = token => ({

  evt_type: 'AUTH_INIT',
  msg_type: 'EVT_MSG',
  token,
  data: {
    code: 'AUTH_INIT',
  },
});

export const SEND_CODE = (event, data, token) => ({

    event_type: event,
    msg_type: "EVT_MSG",
    token: token,
    data: data
});

export default {
  AUTH_INIT,
  SEND_CODE
};
