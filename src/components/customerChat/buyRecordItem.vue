<style lang="less" scoped>
    .record-item {
        padding: 8px;
        color: rgb(16,16,16);
        border-bottom:1px solid #E6E5E5;
    }
    p {
        margin-bottom: 0;
    }
    .plat-form1 {
        color: #5AA9CD;
    }
    .plat-form3 {
        color: #FE0733;
    }
    .plat-form4 {
        color: #FE5606;
    }
    .plat-form5 {
        color: #E22117;
    }
    .plat-form6 {
        color: #E6090D;
    }
</style>
<template>
    <div class="record-item">
        <div style="display: inline-block;">
            <img v-if="recordItem.src" :src="recordItem.src" alt="" style="width: 54px;height: 54px">
            <img v-if="!recordItem.src" src="../../assets/product_img.svg" alt="" style="width: 54px;height: 54px;border:1px solid #EAEAEA">
            <p :class="['plat-form' + recordItem.cl_type]">{{recordItem.platform}}</p>
        </div>
        <div style="color: #353535;margin-left: 10px;margin-top: -3px;width: calc(100% - 70px);display: inline-block;line-height: 1.3">
            <p style="font-size: 14px;color:#333333">
                <span style="text-overflow: ellipsis;overflow:hidden; white-space:nowrap;display: inline-block;max-width: 110px;font-weight:700;font-size:14px">{{recordItem.product_name}}</span>
                <span style="color: #B3B3B3;float: right;font-size:12px">{{recordItem.created}}</span>
            </p>
            <p style="color: #6C6B6B;max-width:230px;overflow:hidden; text-overflow: ellipsis;display: inline-block; white-space:nowrap;">订单号:{{recordItem.order_id}}</p>
            <p style="color: #6C6B6B">
                <span style="margin-right: 5px">单价：￥{{recordItem.single_price}}</span>
                <span>数量：{{recordItem.num}}</span>
            </p>
            <p style="text-align: right">总金额：<span style="color: #FE5606">￥{{recordItem.all_price}}</span></p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'recordItem',
    props: {
        recordItem: {
            type: Object,
            required: true
        }
    },
    data () {
        return {

        }
    },
    computed: {

    },
    methods:{

    }
}
</script>


