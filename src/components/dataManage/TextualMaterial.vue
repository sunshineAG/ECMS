<template>
	<div style="margin: 24px 24px 0;	max-height: 730px; overflow-y: auto;    overflow-x: hidden;" id="text">
		<div class="card-list" ref="content">
	    <a-list
	      :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}"
	      :dataSource="dataSource"
          :locale="locale"
	    >
	        <a-list-item slot="renderItem" slot-scope="item, index" class="card-box">
                <p v-if="item.ask=='1'" class="queTitle"  >
                    <a-icon type="question-circle" class="question" theme='filled'></a-icon>
                    {{item.question?item.question:item.ask}}
                </p>
                <div class="textMaterial"  :hoverable="true" @click="methodHiden ? choseFn(item) : ''" :class="[methodHiden?'tempActive':'']" >
                    <div>
                        <span class="text" v-html="item.content"></span>
                    </div>
                     <div class="cover_box"  slot="cover" v-if ="methodHiden ? false : true" >
                        <div class="cover" slot="cover"></div>
                        <a-icon type="form" class="btn" @click="editFn(item)"/>
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
		 props:['dataSource','methodHiden'],
		data() {
			return {
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
            }
		},
		components: {
		},
		methods: {
			editFn(item){
				 this.$router.push({
          			path: '/dataManage/editMaterial',
          			query: {'id':item.id,'tabs_key':1,'ask':item.ask}
        		})
            },
            choseFn(id){
                console.log(1)
                this.$emit('headCallBackChose',id);
            },
	    	deleteFn(id){
	    		this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
	    	},
		    cancel (e) {
		    },
		},
		created() {
		}
	}
</script>

<style lang="less" scoped>
    // .t:after{
    //     content:'...';
    //     display: inline;      
    //     font-size: 16px;
    // }
    .ant-card-body {
    padding:16px;
}
  .ant-card-bordered,.cover{
        height:150px;
    }
.ant-card-bordered{
    border-color:rgba(240,240,240,1);
    border-radius:4px;
}
.question{
    font-size:22px;
    vertical-align: middle;
    color:rgb(253, 188, 92);
    padding-bottom:4px;
}
.queTitle{
    border:1px solid #e8e8e8;
    border-bottom:0;
    margin:0;
    padding-left:10px;
    height:40px;
    line-height:40px;
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
    .tempActive{
		width: 200px;
		height:135px;
		.ant-card-body {
			// padding: 16px!important;
			// .meta-content {
			// 	height: 100px;
			// 	min-height: 100px;
			// 	margin-bottom: 0;
			// }
		}
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

  .meta-content {
            .text{
                max-height:108px;
                display:block;
                -webkit-line-clamp:5;
                display: -webkit-box;
                -webkit-box-orient:vertical;
                overflow:hidden;
                overflow: hidden;
                text-overflow: ellipsis!important;
            }
			position: relative;
			// height:164px;
			word-break: break-all;
			word-wrap: break-word;
	    // min-height: 164px;
	   	// margin-bottom: 20px;
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
    .textMaterial{
        height:150px;
        padding:14px;
        border:1px solid #f0f0f0;
        border-radius:4px;
        position: relative;
        cursor: pointer;
        .text{
            max-height:124px;
            display:block;
            -webkit-line-clamp:6;
            display: -webkit-box;
            -webkit-box-orient:vertical;
            overflow:hidden;
            overflow: hidden;
            text-overflow: ellipsis!important;
        }
        &hover{

        }
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