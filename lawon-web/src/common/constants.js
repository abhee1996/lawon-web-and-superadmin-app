export const GOOGLE_API_KEY = 'AIzaSyCFpmRrgll23eF9QoiDUOVypqtTQks-zzo';
export const TOKBOX_API_KEY = '46111922';
export const STRIPE_PUBLIC_KEY = 'pk_test_ECqXUnHXWQlfz3JGGTIJ5MaW';

export const POSTCODE_REGEX = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const URL_REGEX = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
export const PRICE_REGEX = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/

export const VAT = 20;

export const CONVERSATION_STATUS = {
  OPEN: 1,
  CLOSED: 2
}

export const CONSULTATION_STATUS = {
  ACTIVE: 1,
  CLOSED: 2,
  CANCELED: 3,
  ACTIVE_RESCHEDULED: 4
}

export const INSTRUCTION_STATUS = {
  OPEN: 1,
  CLOSED: 2
}

export const CALENDAR_TYPE = {
  GOOGLE: 1,
  OUTLOOK: 2
}

export const AUTH_TYPE = {
  CONNECT_CALENDER: 'CONNECT_CALENDER'
}