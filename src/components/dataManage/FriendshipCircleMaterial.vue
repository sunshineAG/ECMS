<template>
	<div style="margin: 24px 24px 0;">
        <div class="warp clearFloat" @click="hideImg" v-if="imgFlg">
                <div :style="{ background:' url('+imgSrc+') no-repeat center',backgroundSize:'contain'}" class="imgInfo"></div>
            </div>
		<div class="card-list " ref="content">
            <a-list
            :grid="{gutter: 24,xxl:6,xl:4, lg: 2, md: 3, sm: 1, xs: 1}"
            :dataSource="dataSource"
            :locale="locale"
            >
	        <a-list-item slot="renderItem" slot-scope="item, index" class="card-box" >
	            <a-card hoverable  class="fcard">
                    <div class="ant-card-meta">
                        <div class="ant-card-meta-detail">
                            <div class="ant-card-meta-title" style="color: #101010">
                                {{item.title}}
                            </div>
                            <div class="ant-card-meta-description">
                                <div style="-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;word-break: break-all;display: -webkit-box;color: #B3B2B2" v-html="item.content"></div>
                            </div>
                        </div>
                    </div>
                    <div  style="margin-top: 10px;">
                        <div v-for="(img_src,img_index) in item.album" style="width: 32%;margin-right:1%;height: 0;padding-bottom: 32%;position: relative;display: inline-block">
                            <img :src="img_src.src" alt="" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0">
                        </div>
                    </div>
                    <div>
                        <div class="cover_box"  slot="cover" v-if ="methodHiden ? false : true" >
                            <div class="cover" slot="cover" ></div>
                            <a-icon type="form" class="btn" @click="editFn(item.id,item.title,item.content,item.album,item.type)" />
                            <span class="btn">
                                <a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
                                    <a-icon type="delete" />
                                </a-popconfirm>
                            </span>
                        </div>
                    </div>
		  	</a-card>
	        </a-list-item>
	    </a-list>
	  </div>
  
	</div>
</template>

<script>
	export default {
		name: "TextualMaterial",
		 props:['dataSource','methodHiden'],
		 
		components: {
		},
		data() {
			return {
                imgSrc:'',
                imgFlg:false,
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                }
			}
		},
		
		methods: {
			editFn(id,title,content,album,type){
	    		this.$router.push({
          			path: '/dataManage/editMaterial',
          			query: {'id':id,'tabs_key':6}
        		})
            },
            pushImg(obj){
                this.imgFlg = true;
                this.imgSrc = obj.src;
                console.log(this.imgSrc)
            },
            hideImg(){
                this.imgFlg = false;
            },
	    	deleteFn(id){
	    		this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
	    	},
	    	 cancel (e) {
		    }
		},
		created() {}
	}
</script>

<style lang="less" scoped>
.card-list{
    width:100%;
    height:700px;
    overflow-y:auto;
    overflow-x:hidden;
}
.imgInfo{
    width:500px;
    height:400px;
    position:absolute;
    top:100px;
    left:50%;
    transform:translate(-50%,0);
}
.context{
    overflow:hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.warp{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index: 99;
    background:rgba(0,0,0,.7);
}
.bgImg1,.bgImg2,.bgImg3,.bgImg4{
    margin:1px;
}
.bgImg1{
    width:98%;
    height:98%;
}
.bgImg2{
    width:47%;
    height:47%;
}
.bgImg3{
    width:30%;
    height:30%;
}
.bgImg4{
    width:30%;
    height:30%;
}
.img_box{
    margin: 20px 0 0 0;
    height:190px;
}
.clearFloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.clearFloat {
		zoom: 1
	}
	
	.fr {
		float: right;
	}
	
	.fl {
		float: left;
	}
	
	.card-box:hover .ant-card-actions{
		opacity: 1;
	}
  .ant-card-actions {
	  	position: relative;
		top: -34px;
	  	opacity: 0;
	  	border-top: 1px solid #e8e8e8;
	    zoom: 1;
	    list-style: none;
	    margin: 0;
	    padding: 0;
	    background: #f7f9fa;
    .ant-btn{
    	border-radius: 0;
    	color: #fff;
    }
    .waring_btn{
    	background: #F4B06C;
    }
    .waring_btn:hover{
    	border: 1px solid #F4B06C;
    }
  }
  .card-box{
  	
  .div-edit{
    	height: auto;
	    border: 0;
	    overflow-y: initial;
	    padding: 0;
	    outline: none;
	    word-break: break-all;
	    word-wrap: break-word;
	    white-space: pre-wrap;
	    max-width: initial;
	    margin: 0;
    }
  }
 .ant-card-hoverable{
		position: relative;
		.cover_box{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			text-align: center;
			.cover{
				opacity: 1;
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
                z-index: 10;
                border-radius: 4px;
			}
			.btn{
				position: absolute;
				top: 50%;
				margin-top: -16px;
				z-index: 10;
				display: none;
			}
			
			.btn:nth-last-child(1){
				left: 53%;
			}
			.btn:nth-last-child(2){
				left: 30%;
			}
		}
		.cover_box:hover .btn{
			display: block;
			color: #fff;
		}
		.cover_box:hover .cover{
			opacity: 0.52;
			background-color: rgb(136, 136, 136);
		}
	}
</style>