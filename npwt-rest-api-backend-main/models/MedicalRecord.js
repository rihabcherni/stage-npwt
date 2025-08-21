const mongoose = require("mongoose");
const MedicalRecordSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecordPatient',
    },
    examinationDate: { 
        type: Date
    },
    modeType: {
        type: String,
        enum: ['ContinuousMode', 'IntermittentMode', 'ContinuousInstillationMode', 'IntermittentInstillationMode'],
    },
    modeInputs: {
        ContinuousMode: {
            Pressure: { type: Number },
        },
        IntermittentMode: {
            MinimumPressure: { type: Number },
            MinimumPressureDuration: { type: Number },
            MaximumPressure: { type: Number },
            MaximumPressureDuration: { type: Number },
        },
        ContinuousInstillationMode: {
            Pressure: { type: Number },
            PressureDuration: { type: Number },
            Volume: { type: Number },
            VolumeDuration: { type: Number },
        },
        IntermittentInstillationMode: {
            MinimumPressure: { type: Number },
            MinimumPressureDuration: { type: Number },
            MaximumPressure: { type: Number },
            MaximumPressureDuration: { type: Number },
            Volume: { type: Number },
            VolumeDuration: { type: Number },
        },
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    nurse: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image:{ 
        type: String 
    },
    taillePlaies: { 
        type: String, 
    },
    pansement: {  
        type: String, 
        enum: ["small", "medium", "large"],
    },
    commentaire: [{
        created_at : { type: Date, required: true, default: Date.now },
        commentaire_texte : { type: String},
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }],
    referenceMachine: {
        type: String,
    },
});
const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
module.exports = MedicalRecord;
