<template>
    <div class="imgBg">
        <svg  :width=width :height=height style="text-align: center">
            <image xlink:href="../../assets/status.svg" width="100%"/>
        </svg>
        <span v-if='!material' class="text">暂无数据</span>
        <span v-if='material' class="matText">暂不支持</span>
    </div>
</template>
<script>
export default {
    name: "dataStatus",
    props:['width','height','material'],
    components:{
    },
    data(){
        return {

        }
    }
}
</script>
<style scoped>
    .imgBg{
        opacity:1;
        text-align:center;
        position:relative;
    }
    .text{
        position:absolute;
        left:50%;
        bottom:44px;
        color:#ccc;
        transform: translateX(-50%);
    }
    .matText{
        position:absolute;
        left:50%;
        bottom:86px;
        color:#00000073;
        transform: translateX(-50%);
    }
</style>

