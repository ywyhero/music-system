import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginData: {},
        previewShow: false,
        instrumentType: '',
        seriesType: '',
        statusType: '',
        videoType: '',
        audioType: '',
        checkType: '',
        iconType: '',
        detailStatusType: '',
        detailCheckType: '',

    },
    getters: {
        getLoginData: state => state.loginData,
        getPreviewShow: state => state.previewShow,
        getInstrumentType: state => state.instrumentType,
        getSeriesType: state => state.seriesType,
        getStatusType: state => state.statusType,
        getVideoType: state => state.videoType,
        getAudioType: state => state.audioType,
        getCheckType: state => state.checkType,
        getIconType: state => state.iconType,
        getDetailStatusType: state => state.detailStatusType,
        getDetailCheckType: state => state.detailCheckType,
    },
    mutations: {
        ADD_LOGIN_DATA(state, v) {
            state.loginData = v
        },
        PREVIEW_SHOW(state, v) {
            state.previewShow = v
        },
        INSTRUMENT_TYPE(state, v) {
            state.instrumentType = v
        },
        SERIES_TYPE(state, v) {
            state.seriesType = v
        },
        STATUS_TYPE(state, v) {
            state.statusType = v
        },
        VIDOE_TYPE(state, v) {
            state.videoType = v
        },
        AUDIO_TYPE(state, v) {
            state.audioType = v
        },
        CHECK_TYPE(state, v) {
            state.checkType = v
        },
        ICON_TYPE(state, v) {
            state.iconType = v
        },
        DETAIL_STATUS_TYPE(state, v) {
            state.detailStatusType = v
        },
        DETAIL_CHECK_TYPE(state, v) {
            state.detailCheckType = v
        }
    },
    actions: {
        addLoginData({commit}, v){
            commit('ADD_LOGIN_DATA', v)
        },
        changePreviewShow({commit}, v) {
            commit('PREVIEW_SHOW', v)
        },
        changeInstrumentType({commit}, v) {
            commit('INSTRUMENT_TYPE', v)
        },
        changeSeriesType({commit}, v){
            commit('SERIES_TYPE', v)
        },
        changeStatusType({commit}, v) {
            commit('STATUS_TYPE', v)
        },
        changeVideoType({commit}, v) {
            commit('VIDOE_TYPE', v)
        },
        changeAudioType({commit}, v) {
            commit('AUDIO_TYPE', v)
        },
        changeCheckType({commit}, v) {
            commit('CHECK_TYPE', v)
        },
        changeIconType({commit}, v) {
            commit('ICON_TYPE', v)
        },
        changeDetailStatusType({commit}, v) {
            commit('DETAIL_STATUS_TYPE', v)
        },
        changeDetailCheckType({commit}, v) {
            commit('DETAIL_CHECK_TYPE', v)
        },
    }
})
