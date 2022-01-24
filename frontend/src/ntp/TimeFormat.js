import moment from 'moment';

export const formatIsoDateTime = (isoDateString) => moment.parseZone(isoDateString).format('ll @ HH:mm:ss');

export const formatLocalDateTime = (moment) => moment.format('YYYY-MM-DDTHH:mm');
