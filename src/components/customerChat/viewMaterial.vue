<style scoped="">
    p {
        margin-bottom: 0;
    }
    .view-material {
        background: #F4F4F4;
        color: rgb(16,16,16);
        border-radius: 5px;
        cursor: pointer;
    }
    .view-material .ivu-card-head{
        padding: 0!important;
    }
    .w-a {
        width: 85%!important;
        padding: 4px!important;
    }
    /* .mediacontent{
        height:200px;
        border:1px solid #ccc;
    } */
    .fr{
        float:right;
    }
    .fl{
        float:left;
    }
    .crl:after{
        display:block;
        clear:both;
        content:'';
        height:0;
        visibility: hidden;
    }
    .titleLink{
        color:#222;
        font-size:14px;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
    }
    .video{
        width:100%;
        height:100%;
        background:rgba(0, 0, 0, .6);
        position:absolute;
        color:#fff;
        text-align:center;
        line-height:130px;
    }
    .vidoIcon{
        font-size:24px;

    }
</style>
<template>
    <div class="view-material" v-if="dataItem.type!=9" @click="emit()">
        <div v-bind:class="{ 'w-a': usedType!='0'}" style="max-width:100%;word-break: break-all;margin:0 auto;padding: 10px" v-if="dataItem!=null">
            <div v-if="dataItem.type=='1'" class="mediacontent">
                <p v-html="dataItem.content" style="padding: 5px;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;word-break: break-all;display: -webkit-box;color: #464646"></p>
            </div>
            <div v-if="dataItem.type=='2'" style="text-align: center" class="mediaImg">
                <img :src="dataItem.mediapath" style="max-width: 100%;max-height: 120px;object-fit: cover;width: 100%">
            </div>
            <div v-if="dataItem.type=='3'" style="background: #ffffff">
                <!-- <h3>{{dataItem.title}}</h3>  -->
                <div style="width:100%;padding:10px;">
                    <p class="titleLink">{{dataItem.title}}</p>
                    <div class="crl">
                        <p class="fl"  style="margin-top:10px;max-width: calc(100% - 70px);font-size:12px;color:#838383;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{dataItem.desc}}</p>
                        <img class="fr" :src="dataItem.mediapath" style="width:50px;height:50px;display: inline-block;" />
                    </div>
                </div>
                <!-- <p style="min-height: 60px;">
                    <span style="display: inline-block;max-width: calc(100% - 70px)">{{dataItem.desc}}</span>
                    <img :src="dataItem.mediapath" style="width:60px;display: inline-block;" />
                </p> -->
                <!-- <p >
                    链接
                </p> -->
            </div>
            <div v-if="dataItem.type=='7'" style="background: #ffffff;">
                <p style="height:56px;line-height: 56px;text-align: left;padding: 0 10px">
                    <img :src="dataItem.mediapath?dataItem.mediapath:require('../../assets/cardIcon.png')" alt="" style="width: 30px;height: 30px">
                    <span style="margin-right: 20px;color: #101010;vertical-align:-webkit-baseline-middle;">{{dataItem.title}}</span>
                </p>
                <p style="line-height: 25px;height: 25px;border-top: 1px solid #F0F0F0;color:#7D7D7D;padding: 0 10px;font-size: 12px">
                    公众号名片
                </p>
            </div>
            <div v-if="dataItem.type=='8'">
                <div style="width:100%;padding:6px 10px 0;margin: 0 auto;background: #ffffff">
                    <p style="line-height: 40px;height: 40px;">
                        <img :src="dataItem.iconurl" style="width:20px;height: 20px;border-radius: 50%;vertical-align: middle" />
                        <span style="color:#717171;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: calc(100% - 25px);overflow: hidden;display: inline-block;vertical-align: middle">{{dataItem.title}}</span>
                    </p>
                    <p style="color:#222;max-height: 260px;overflow: hidden">
                        <span style="-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{dataItem.desc}}</span>
                        <img :src="dataItem.mediapath" style="width:100%;display: block;padding-top: 10px" />
                    </p>
                    <p style="color:#717171;height: 25px;line-height: 25px;width: calc(100% + 20px);margin-left: -10px;border-top:  1px solid #f0f0f0;font-size: 12px">
                        <img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
                        小程序,请在手机上查看
                    </p>
                </div>
            </div>
            <div v-if="dataItem.type=='10'" style="background: #ffffff;padding: 10px 15px;position: relative">
                <div style="width: 80%;word-break: break-all;color: #101010;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{dataItem.title}}</div>
                <div style="position: relative;margin-top: 10px">
                    <span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{dataItem.desc}}</span>
                </div>
                <div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 20px;transform: translateY(-50%);border-radius: 4px">
                    <img src="../../assets/file-img1.png" alt="">
                    <!--<img v-if="dataItem.mediapath!=''" :src="dataItem.mediapath" alt="" style="top: 0">-->
                </div>
            </div>
            <div v-if="dataItem.type=='11'" style="text-align: center;max-height: 120px;overflow:hidden;position:relative;" class="mediaImg">
                <!-- <div style="height:100px;">{{dataItem}}</div> -->
                <div class="video">
                    <a-icon type="play-circle" class="vidoIcon"></a-icon>
                </div>
                <video   style="width:100%" >
                    <source :src="dataItem.mediapath" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</template>

<script>
    var emoji = require('../../common/emojiMap');
    export default {
        name: "viewMaterial",
        props: {
            dataItem:{
                type:Object,
                default:()=>{}
            },
            usedType :{
                type: String,
                default:()=>'0'
            }
        }
        , data() {
            return {

            }
        },
        methods:{
            emit() {
                this.$emit('click',this.dataItem)
            }
        },
        created(){

        }
    }
</script>

