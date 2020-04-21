<template>
	<div style="margin: 24px 24px 0;">
		<div class="card-list" ref="content">
			<a-list :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}" :dataSource="dataSource" :locale="locale">
				<a-list-item slot="renderItem" slot-scope="item, index"  class="card-box" >
                    <div class="ant-card-hoverable"  @click="methodHiden?choseFn(item):''" :style="{width:width?width+'px':'',height:height?height+'px':''}">
                        <p v-if="item.ask=='1'" class="queTitle">
                            <a-icon type="question-circle" class="question" theme='filled'></a-icon>
                            {{item.question?item.question:'--'}}
                        </p>
                        <div class="publicCard ">
                            <div style="height:56px;line-height: 56px;text-align: left;padding: 0 10px">
                                <img :src="item.mediapath?item.mediapath:require('../../assets/cardIcon.png')" alt="" style="width: 30px;height: 30px;">
                                <!-- <img src="../../assets/cardIcon.png" alt="" style="width: 30px;height: 30px"> -->
                                <span style="margin-right: 20px;color: #101010;vertical-align:-webkit-baseline-middle;">{{item.title}}</span>
                            </div>
                            <div style="line-height: 25px;height: 25px;border-top: 1px solid #F0F0F0;color:#7D7D7D;padding: 0 10px;font-size: 12px">
                                公众号名片
                            </div>
                        </div>	
                        <div class="cover_box"  slot="cover" v-if ="methodHiden ? false : true" >
                            <div class="cover" slot="cover" ></div>
                            <a-icon type="form" class="btn" @click="editFn(item)" />
                            <span class="btn">
                                <a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
                                    <a-icon type="delete" />
                                </a-popconfirm>
                            </span>
                        </div>
                </div>
				</a-list-item>
			</a-list>
		</div>

	</div>
</template>

<script>
    
	export default {
		name: "TextualMaterial",
		props: ['dataSource','methodHiden','width','height','power'],
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
			editFn(item) {
				this.$router.push({
          			path: '/dataManage/editMaterial',
                    query: {'id':item.id,'tabs_key':4,'ask':item.ask}
        		})
            },
            choseFn(item){
                this.$emit('headCallBackChose',item);
            },
			deleteFn(id) {
				this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
			},
			cancel (e) {
		    }
		},
		created() {}
	}
</script>

<style lang="less" scoped>
	/*.ant-card-bordered{*/
			/*border:1px solid #F4B06C;*/
			/*border-radius: 5px 5px 0 0;*/
    /*}*/
    .question{
    font-size:22px;
    vertical-align: middle;
    color:rgb(253, 188, 92);
    padding-bottom:4px;
}
.publicCard{
    border:1px solid #f0f0f0;
    border-radius:0 0 7px 7px;
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
.imgHead{
    float: left;
    width:60px;
    background:#222;
    height:60px;
    border-radius:50%;
    margin-left:10px;
    margin-top:10px;
    text-align:center;
    
    .font{
        color:#fff;
        font-size:26px;
        height:60px;
        margin-top:4px;
        line-height:60px;
    }
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
		.top_box {
			.car_box {
				display: inline-block;
			    height: 8em;
			    width: 8em;
			    background: #fef1bc;
			    color: #333;
			    text-align: center;
			    line-height: 8em;
			    border-radius: 50%;
			    letter-spacing: 3px;
			    vertical-align: middle;
			    font-size: 0.9em;
                margin: 0 0 0 45px;
                border-radius: 5px;
			}
			.ant-card-meta-detail{
				margin-top: 16%;
			}
		}
	.carTop:after{
        display: block;
        clear: both;
        content: '';
        height:'';
        visibility: hidden;
    }
	.bottom_box {
		padding: 7px 0;
		background: rgb(240, 250, 255);
		font-size: 12px;
		color: #5f5f5f;
		text-align:center;
		margin-bottom: 33px;
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