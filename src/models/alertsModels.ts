import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    a_name: {type: 'string', required: 'Alert name is required'},
    a_type: {type: 'string', required: 'Alert type is required'},
    a_v_id : {type: 'string', required: 'Vehicle number is required'},
    a_status: {type: 'string'},
    a_u_id: {type: 'string', required: 'user id is required'},
    a_end_date: {type:'string', required: 'alert end date is required'},
    a_created_by: {type: 'string', required: 'alert user is required'},
    a_pass_link: {type: 'string'},
    a_cal_id: {type: 'string'}
},{ timestamps: true })

const AlertModel = mongoose.models.Alert || mongoose.model('Alert', alertSchema);
export default AlertModel;