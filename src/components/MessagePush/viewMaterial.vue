<template>
	<div class="view-material">
		<a-row>
			<a-col :span="showDel=='0'?10:13">
				<div style="max-width:100%;word-break: break-all;padding: 10px" v-if="dataItem!=null">

					<div v-if="dataItem.type=='1'">
						<!--<div class="div-edit" v-html="dataItem.content"></div>-->
						<div v-html="dataItem.content" style="padding: 5px;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;word-break: break-all;display: -webkit-box;color: #464646;border: 1px solid #ededed;line-height: 1.5;border-radius: 5px"></div>
					</div>
					<div v-if="dataItem.type=='2'" style="text-align: center;max-width: 260px">
						<!--<img alt="example" :src="dataItem.mediapath" slot="cover" style="max-height: 150px"/>-->
						<img :src="dataItem.mediapath" style="max-width: 100%;max-height: 120px;object-fit: cover;width: 100%">
					</div>
					<div v-if="dataItem.type=='3'" style="max-width: 260px">
						<div style="width:100%;padding:10px;border: 1px solid #ededed;line-height: 1.5;border-radius: 5px" v-if="isPush==0" :class="[isInSending==1?'bg-white':'']">
							<div class="titleLink">{{dataItem.title}}</div>
							<div style="position: relative;text-align: right">
								<p style="max-width: calc(100% - 70px);font-size:12px;color:#838383;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;position: absolute;left: 0;top: 10px">{{dataItem.desc}}</p>
								<img  :src="dataItem.mediapath" style="width:50px;height:50px;" />
							</div>
						</div>
						<div style="width:100%;padding:10px;border: 1px solid #ededed;line-height: 1.5;border-radius: 5px" v-if="isPush==1" :class="[isInSending==1?'bg-white':'']">
							<img :src="dataItem.mediapath" style="width:50px;height:50px;display: inline-block;border-radius: 5px" />
							<div style="color:#222;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: calc(100% - 75px);margin-left: 5px;overflow: hidden;display: inline-block;position: absolute;top: 50%;transform: translateY(-50%);">{{dataItem.title}}</div>
						</div>
					</div>
					<div v-if="dataItem.type=='7'"  style="max-width: 260px">
                         <div style="border: 1px solid #ededed;line-height: 1.5;border-radius: 5px"  :class="[isInSending==1?'bg-white':'']">
							 <p style="height:56px;line-height: 56px;text-align: left;padding: 0 10px">
								 <img src="../../assets/cardIcon.png" alt="" style="width: 30px;height: 30px">
								 <span style="margin-right: 20px;color: #101010">{{dataItem.title}}</span>
							 </p>
							 <p style="line-height: 25px;height: 25px;border-top: 1px solid #F0F0F0;color:#7D7D7D;padding: 0 10px;font-size: 12px">
								 公众号名片
							 </p>
                        </div>

					</div>
					<div v-if="dataItem.type=='8'" style="max-width: 260px">
						<div style="width:100%;padding:6px 10px 0;margin: 0 auto;background: #ffffff;border: 1px solid #ededed;line-height: 1.5;border-radius: 5px">
							<p style="line-height: 40px;height: 40px">
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
					<div v-if="dataItem.type=='9'" style="max-width: 260px">
						<a-card hoverable class="push-friend">
							<div class="ant-card-meta">
								<div class="ant-card-meta-detail">
									<div class="ant-card-meta-title" style="color: #101010">
										{{dataItem.title}}
									</div>
									<div class="ant-card-meta-description">
										<div style="-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;word-break: break-all;display: -webkit-box;color: #B3B2B2" v-html="dataItem.content"></div>
									</div>
								</div>
							</div>
							<div  style="margin-top: 10px;">
								<div v-for="(img_src,img_index) in dataItem.album" style="width: 32%;margin-right:1%;height: 0;padding-bottom: 32%;position: relative;display: inline-block">
									<img :src="img_src.src" alt="" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0">
								</div>
								<!--<img alt="example" style="width: 30%;height: 30%;margin-bottom: 4px;margin-right: 3%" :src="img_src.src" slot="cover" v-for="(img_src,img_index) in dataItem.album" />-->
							</div>
						</a-card>
					</div>
					<div v-if="dataItem.type=='10'" style="background: #ffffff;padding: 10px 15px;position: relative;border: 1px solid #ededed;line-height: initial;">
						<div style="width: 80%;word-break: break-all;color: #101010;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{dataItem.title}}</div>
						<div style="position: relative;margin-top: 10px">
							<span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{dataItem.desc}}</span>
						</div>
						<div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 20px;transform: translateY(-50%);border-radius: 4px">
							<img src="../../assets/file-img1.png" alt="">
							<!--<img v-if="dataItem.mediapath!=''" :src="dataItem.mediapath" alt="" style="top: 0">-->
						</div>
					</div>
                    <div v-if="dataItem.type=='11'"  style="max-width: 260px">
						<a-card hoverable class="push-friend">
							<div class="ant-card-meta">
								<div class="ant-card-meta-detail" style="text-align: center;max-height: 120px;overflow:hidden;position:relative;">
									<div class="video">
                                        <a-icon type="play-circle" class="vidoIcon"></a-icon>
                                    </div>
                                    <video   style="width:100%" >
                                        <source :src="dataItem.mediapath" type="video/mp4">
                                    </video>
								</div>
							</div>
						</a-card>
					</div>
				</div>
				<a-icon class='dynamic-delete-button' type='minus-circle-o' @click="() => emit()" v-if="showDel=='0'"/>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	export default {
		name: "viewMaterial",
		components: {
		},
		props: {
			dataItem: {
				type: Object,
				default:()=>{}
			},
            showDel:{
			    type:String,
				default:()=>'0'
			},
			isPush:{
			    type:String,
				default:'0'
			},
            isInSending:{
                type:String,
                default:'0'
            }
		},
		data() {
			return {

			}
		},
		methods: {
			emit() {
				this.$emit('click')
			}
		}
	}
</script>

<style>

</style>
<style scoped lang="less">
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
	.top_box {
		.car_box {
			display: inline-block;
			height: 100px;
			width: 100px;
			background: #fef1bc;
			color: #333;
			text-align: center;
			line-height: 100px;
			border-radius: 50%;
			letter-spacing: 3px;
			vertical-align: middle;
		}
		span {
			font-size: 20px;
			margin-left: 10px;
		}
	}

	.fr {
		float: right;
	}
	
	.fl {
		float: left;
	}
	
	p {
		margin-bottom: 0;
	}
	
	.view-material {
		position: relative;
		background: #ffffff;
		// margin: 10px 0;
		color: rgb(16, 16, 16);
		border-radius: 5px;
		cursor: pointer;
		margin-left: -16px;
		/*display: inline-block;*/
		/*max-width: 250px;*/
		/*margin-right: 60px;*/
	}
	
	.dynamic-delete-button {
		position: absolute;
		right: -26px;
		top: 50%;
		margin-top: -9px;
		cursor: pointer;
	}
	
	.dynamic-delete-button svg {
		font-size: 18px;
	}
	
	.view-material .ivu-card-head {
		padding: 0!important;
	}
	
	.w-a {
		width: auto!important;
		padding: 4px!important;
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
	.push-friend {
		border-color: #ededed;
		border-radius: 5px;
		padding: 0!important;
		.ant-card-body {
			padding: 10px;
			.ant-card-meta {
				margin-left: 0!important;
			}
		}
	}
	.bg-white {
		background: #ffffff;
	}
</style>

<style scoped>
	.div-edit {
	    height: 100px;
	    border: 1px solid #c2c2c2;
	    overflow-y: auto;
	    line-height: 1.4;
	    padding: 10px;
	    outline: none;
	    word-break: break-all;
	    word-wrap: break-word;
	    white-space: pre-wrap;
	    max-width: 870px;
	}

	.bottom_box {
		padding: 7px 0;
		background: #fafafa;
		font-size: 12px;
		color: #5f5f5f;
		padding-left: 24px;
    }
    .ant-card-body img{
		max-height: 60px;
		max-width: 60px;
		float: left;
    }
    .publicCard{
		border:1px solid #e8e8e8;
		border-radius:0 0 7px 7px;
    }
    .carTop:after{
        display: block;
        clear: both;
        content: '';
        height:'';
        visibility: hidden;
    }
    .imgHead{
		float: left;
		width:30%;
		background:#fef1bc;;
		height:60px;
		border-radius:50%;
		// border:1px solid #ccc;
		margin-left:10px;
		margin-top:10px;
		text-align:center;
		line-height:60px;
    }
    .contentCard{
		vertical-align: middle;
		float: left;
		margin-top:10px;
		padding-left:10px;
		line-height:60px;
    }   
    .context{
		border-top:1px solid #e8e8e8;
		padding:10px 10px 10px 16px;
    }
    .ant-card-body .ant-card-meta {
		/*display: inline-block;*/
		vertical-align: middle;
		margin-left: 70px;
    }
    .titleSmall{
    	padding:10px 0 ;
    }
    .bgimgcover{
    	height:100px;
    }
    .contentSmall{
		cursor: pointer;
		padding:10px;
		border:1px solid #e8e8e8;
    }
    .contentSmall:after{
        display:block;
        visibility: hidden;
        clear: both;
        height: 0;
        content: "";
    }
    .footerSmall{
		margin-top:10px;
		padding-top:10px;
		border-top:1px solid #e8e8e8;
    }
</style>