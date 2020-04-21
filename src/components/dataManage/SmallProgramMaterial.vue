<template>
	<div style="margin: 24px 24px 0;">
		<div class="card-list" ref="content">
	    <a-list
				:grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}"
	      :dataSource="dataSource"
           :locale="locale"
	    >
	      <a-list-item slot="renderItem" slot-scope="item, index" class="card-box">
              <div :hoverable="true" class="ant-card-cover" @click="methodHiden ? choseFn(item) : ''" :style="{width:width?width+'px':'',height:height?height+'px':''}">
                <p v-if="item.ask=='1'" class="queTitle">
                    <a-icon type="question-circle" class="question" theme='filled'></a-icon>
                    {{item.question?item.question:'--'}}
                </p>
                <div class="contentSmall">
                    <div style="line-height: 40px;height: 40px">
                        <img :src="item.iconurl" style="width:20px;height: 20px;border-radius: 50%;vertical-align: middle" />
                        <span style="color:#717171;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: calc(100% - 25px);overflow: hidden;display: inline-block;vertical-align: middle">{{item.title}}</span>
                    </div>
                    <div style="color:#222;max-height: 240px;overflow: hidden">
                        <span style="-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.desc}}</span>
                        <img :src="item.mediapath" style="width:100%;display: block;padding-top: 10px" />
                    </div>
                    <div style="color:#717171;height: 25px;line-height: 25px;width: calc(100% + 20px);margin-left: -10px;border-top:  1px solid #f0f0f0;font-size: 12px">
                        <img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
                        小程序,请在手机上查看
                    </div>
                    <div class="cover_box"  slot="cover" v-if ="methodHiden ? false : true" >
                        <div class="cover" slot="cover" ></div>
                            <a-icon type="form" class="btn" @click="editFn(item)" />
                            <span class="btn">
                                <a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
                                    <a-icon type="delete"  />
                                </a-popconfirm>
                            </span>
                        </div>
                    </div>
           </div>

	        <!-- <a-card :hoverable="true" class="ant-card-body" style="padding:0;" @click="methodHiden ? choseFn(item) : ''" :style="{width:width?width+'px':'',height:height?height+'px':''}">
             </a-card> -->

          <!-- <div class="ant-card-actions" v-if ="methodHiden ? false : true">
            	<a-row>
            		<a-col span="12">
            			 <a-button type="primary" @click="editFn(item)" block>编辑</a-button>
            		</a-col>
            		<a-col span="12">
            			<a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
						   		<a-button class="waring_btn" block>删除</a-button>
						</a-popconfirm>
            		</a-col>
            	</a-row>
            </div> -->
	      </a-list-item>
	    </a-list>
	  </div>
	</div>
</template>

<script>
	export default {
		name: "TextualMaterial",
		 props:['dataSource','methodHiden','width','height'],
		data() {
			return {
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                }
            }
		},
		
		methods: {
	    	editFn(item){
	    		 this.$router.push({
          			path: '/dataManage/editMaterial',
                     query: {'id':item.id,'tabs_key':5,'ask':item.ask}
        		})
            },
            choseFn(id){
                this.$emit('headCallBackChose',id);
            },
	    	deleteFn(id){
	    		this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
	    	},
		    cancel (e) {
		    }
		},
		created() {
		}
	}
</script>

<style lang="less" scoped>
    .ant-card-cover{
        height: auto;
    }
    .footerSmall{
        margin-top:10px;
        padding-top:10px;
        border-top:1px solid #e8e8e8;
    }
    .titleSmall{
        //  position:absolute;top:16px;
        padding:10px 0 ;

    }
    .contentSmall{
        cursor: pointer;
        padding:10px 10px 0;
        border:1px solid #f0f0f0;
    }
    .contentSmall:after{
        display:block;
        visibility: hidden;
        clear: both;
        height: 0;
        content: "";
    }
    .bgimgcover{
        height:100px;
    }
    .bgImg{
        // margin-top:20px;
        // position:absolute;
        // top:0;

    }
    .question{
        font-size:22px;
        vertical-align: middle;
        color:rgb(253, 188, 92);
        padding-bottom:4px;
    }
    .queTitle{
        font-size:14px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        color:rgb(59, 59, 59);
        text-overflow: ellipsis;
        border-top-left-radius:4px;
        border-top-right-radius:4px;
    }
    .card-list{
        width:100%;
        height:700px;
        overflow-y:auto;
        overflow-x:hidden;
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
    .contentSmall{
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