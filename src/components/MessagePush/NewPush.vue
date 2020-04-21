<template>
	<div class="companyStyle creatPush" >
        <!-- style="position: relative;margin-top: 50px;" -->
          <div class='company-header'>
            <div class="row">
                <div class="tit floatLeft">新建推送</div>
                <a-button class="right" type="default" icon="left" @click="cancel" >返回</a-button>
            </div>
          </div>
		<!-- class="background-color" -->
		<div class="company-content page-style" >
			<a-form :form="form" id='components-form-demo-normal-login' @submit.prevent="handleSubmit" class='login-form' v-show="!fixed_show">
				<a-row >
					<a-col :span="24" >
						<a-form-item label="任务名称："   v-bind="formItemLayout" style="border-bottom:1px solid #ededed;padding-bottom:10px;margin-bottom:12px;padding-left:14px;">
							<a-input v-model="queryForm.task_name" style="width:300px;" placeholder="请输入任务名称" maxlength='15' ></a-input>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row type="flex" justify="start">
					<a-col :span="24" class="col-margin" style="padding-left:14px;">
						<a-form-item  label="选择部门"  v-bind="formItemLayout" style="margin-bottom:14px;">
							<a-row>
								<a-col :span="14" style="padding: 0 20px 0 0;max-height:300px;" >
									<a-tree-select
											:treeData="departmentList"
											:treeDefaultExpandAll="true"
											v-model="selectDepartment"
											@select="onSelect"
											@change="onChange"
											:treeCheckable="true"
											:treeCheckStrictly="true"
											:disabled="!$store.state.user.user.see_power"
											allowClear
											multiple
									>
									</a-tree-select>
								</a-col>
							</a-row>
						</a-form-item>
						<a-form-item  label="选择微信号"  v-bind="formItemLayout" style="margin-bottom:4px;">
							<a-row>
								<a-col :span="14" style="padding: 0 20px 0 0">
									<a-select mode="multiple" allowClear v-model="selectWxlist" style="width: 100%" @change="wxListOnChange">
										<a-select-option v-for="item in wxList" :key="item.assistant_id" :disabled="item.status==0">
											{{item.nickname}}
											<a-tooltip placement="left" v-if="item.status==0" >
												<template slot="title">
													<a-icon type="info-circle" theme="filled" style="color: #FF9800"/>
													<span style="color:#FF9800">该微信号存在手机端微信网络连接异常，暂无法选择，请查看手机状态</span>
												</template>
												<a-icon type="info-circle" theme="filled" style="color: #DDDDDD;float: right;margin-top: 3px;margin-right: -20px;"/>
											</a-tooltip>
										</a-select-option>
										<!--<div slot="dropdownRender" slot-scope="menu" style="padding: 0 10px">-->
											<!--<v-nodes :vnodes="menu"/>-->
											<!--<a-icon type="info-circle" theme="filled" style="color: #FF9800"/>-->
											<!--<span style="color:#FF9800">该微信号存在手机端微信网络连接异常，暂无法选择，请查看手机状态</span>-->
										<!--</div>-->
									</a-select>
								</a-col>
							</a-row>
						</a-form-item>
						<a-form-item  :label="pushType=='10'?'选择客户':'谁可以看：'"  v-bind="formItemLayout" style="margin-bottom:4px;">
							 <a-radio-group @change="onChangeRadio" v-model="queryForm.visble_type">
							    <a-radio :value="10">{{pushType=='10'?'全部推送':'全部可见'}}</a-radio>
							    <a-radio :value="20">{{pushType=='10'?'部分推送':'部分可见'}}</a-radio>
							    <a-radio :value="30">{{pushType=='10'?'不给谁推送':'不给谁看'}}</a-radio>
							 </a-radio-group>
						</a-form-item>
						<a-form-item  label="选择标签："  v-bind="formItemLayout" v-if="queryForm.visble_type==20||queryForm.visble_type==30" style="margin-bottom:12px;">
							<!--<a-radio-group buttonStyle="solid" :value="queryForm.friendsChecked" @change="onChangeRobot" style="margin-right: 20px;">
								<a-radio-button :value="false">包含</a-radio-button>
								<a-radio-button :value="true">不包含</a-radio-button>
							</a-radio-group>-->
							<!--机器人标签列表-->
							<!--<a-select :allowClear="true" placeholder="请选择。。。" @change="handleChangeRobot" mode="multiple" style="max-width: 300px" v-decorator="['userLabel', {rules: [{ required: true, message: '不能为空!', type: 'array' }]}]">
								<a-select-option :key="items.id" v-for="(items,index) in userLabel">
									{{items.title}}
								</a-select-option>
							</a-select>-->
							<div class="ant-select ant-select-enabled ant-select-allow-clear" @click="clickChangeUser(3)" id="userLabel" style="min-width: 20%;display: inline-block;width: initial;" v-decorator="['userLabel', {rules: [{ required: false, message: '不能为空!', type: 'array' }]}]">
								<div class="ant-select-selection ant-select-selection--multiple" style="cursor: pointer;">
									<div class="ant-select-selection__rendered">
										<div unselectable="on" class="ant-select-selection__placeholder"  v-if="select_label.length==0?true:false" style="display: block; user-select: none;">请选择。。。</div>
										<ul v-if="select_label.length>0?true:false">
											<li unselectable="unselectable" :title="item.title" class="ant-select-selection__choice" style="user-select: none;" v-for="(item,index) in select_label">
												<div class="ant-select-selection__choice__content ">
													{{item.title}}
												</div>
												<span class="ant-select-selection__choice__remove" style="top: 0;" @click.stop="clear_label_user(index)">
													<i class="ant-select-remove-icon anticon anticon-close">
														<svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
															<path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
															</path>
														</svg>
													</i>
												</span>
											</li>
										</ul>
									</div>
									<span unselectable="unselectable" class="ant-select-selection__clear"  @click.stop="clear_label_all"  v-if="select_label.length==0?false:true">
										<i class="ant-select-clear-icon anticon anticon-close-circle">
											<svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="">
												<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z">
												</path>
											</svg>
										</i>
									</span>
								</div>
							</div>
						</a-form-item>
					</a-col>
					<a-col :span="24" class="col-margin"  v-if="queryForm.visble_type==20||queryForm.visble_type==30" style="padding-left:14px;">
						<a-form-item   label="选择客户："  v-bind="formItemLayout" style="margin-bottom:12px;">
							<!--<a-radio-group buttonStyle="solid" :value="queryForm.userChecked" @change="onChangeUser" style="margin-right: 20px;">
								<a-radio-button :value="false">包含</a-radio-button>
								<a-radio-button :value="true">不包含</a-radio-button>
							</a-radio-group>-->
							<!--用户标签列表-->
							<!--<a-select :allowClear="true" placeholder="请选择。。。"  @change="handleChangeUser" mode="multiple" style="max-width: 300px;" v-decorator="['friendsId', {rules: [{ required: true, message: '不能为空!', type: 'array' }]}]">
								<a-select-option :key="item.id" v-for="(item,index) in friendsId">
									{{item.title}}
								</a-select-option>
							</a-select>-->
							<div class="ant-select ant-select-enabled ant-select-allow-clear" @click="clickChangeUser(2)" id="friendsId" style="min-width: 20%;display: inline-block;width: initial;" v-decorator="['friendsId', {rules: [{ required: false, message: '不能为空!', type: 'array' }]}]">
								<div class="ant-select-selection ant-select-selection--multiple" style="cursor: pointer;">
									<div class="ant-select-selection__rendered">
										<div unselectable="on" class="ant-select-selection__placeholder"  v-if="select_user.length==0?true:false" style="display: block; user-select: none;">请选择。。。</div>
										<ul v-if="select_user.length>0?true:false">
											<li unselectable="unselectable" :title="item.nickname" class="ant-select-selection__choice" style="user-select: none;" v-for="(item,index) in select_user">
												<div class="ant-select-selection__choice__content">
													{{item.remark || item.nickname}}
												</div>
												<span class="ant-select-selection__choice__remove" style="top: 0;" @click.stop="clear_user(index)">
													<i class="ant-select-remove-icon anticon anticon-close">
														<svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="">
															<path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
															</path>
														</svg>
													</i>
												</span>
											</li>
										</ul>
									</div>
									<span unselectable="unselectable" class="ant-select-selection__clear"  @click.stop="clear_user_all"  v-if="select_user.length==0?false:true">
										<i class="ant-select-clear-icon anticon anticon-close-circle">
											<svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="">
												<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z">
												</path>
											</svg>
										</i>
									</span>
								</div>
							</div>
							
						</a-form-item>
					</a-col>
					<a-col :span="24"  class="col-margin" style="padding-left:14px;"> <!--:push="2" -->
						<a-form-item  label=" " :colon="false" v-bind="formItemLayout" style="margin-bottom:12px;">
							<div class="ant-alert">
								<a-icon type="info-circle" class="circle_icon" theme="filled" style="color:#5aa9cd" />
								<span class="ant-info" v-if="userTotal==0?true:false">
									<label style="padding-left:10px;">所有客户不可见</label>
								</span>
								<span class="ant-info" v-else-if="queryForm.visble_type!='10'">
									<label style="padding-left:10px;">已选择</label><span > {{userTotal}} </span><label>个客户(已去重)</label> <span class="pointer" @click="clearLabel">清空</span>
								</span>
								<span class="ant-info" v-else>
									<label style="padding-left:10px;">{{pushType=='10'?'全部推送':'全部可见'}}</label>
								</span>
							</div>
						</a-form-item>

					</a-col>
	
					<a-col :span="24" class="col-margin" style="border-top: 1px solid #EDEDED;padding-top: 10px;padding-left:14px;">
						<a-form-item  label="推送时间："  v-bind="formItemLayout"  style="margin-bottom:0;">
							<a-radio-group @change="onChangeSend" v-model="queryForm.sendValue">
								<a-radio :value="20" style="margin: 0 10px 10px 0;">立即发送</a-radio>
								<a-radio :value="10" style="margin-bottom: 10px;">定时发送</a-radio>
							</a-radio-group>
						</a-form-item>
                        <a-form-item class="col-margin" v-if="pushTypeInc" label=" " :colon="false" v-bind="formItemLayout" v-show="queryForm.sendValue==10" style="margin-bottom:6px;">
							<div >
                               <a-date-picker placeholder="请选择推送时间"  @openChange='okPushDate'  @change="getPushDate" :disabledDate="disabledDate" :disabledTime='getDisabledPushHoursa' format="YYYY/MM/DD HH:mm:ss" showTime></a-date-picker> 
                               <a-tooltip placement="right">
									<template slot='title'>
										<span>最多支持选择5个时间，选择时间需要大于当前30分</span>
									</template>
									<a-icon type="exclamation-circle" theme="filled"/>
								</a-tooltip>
							</div>
                            <span class="push-time" v-if="pushTimeShow.length"  >
                                <span v-for="(item,index) in pushTimeShow" class="push-icon" >
                                    {{item}}<a-icon type="close" style="cursor:pointer;color:#FF6154;margin-left:2px;" @click="deleteTime(index)"></a-icon>
                                </span>
                            </span>
						</a-form-item>
						<a-form-item v-else label=" " :colon="false" v-bind="formItemLayout" v-show="queryForm.sendValue==10" style="margin-bottom:0;">
							<div >
								<div v-decorator="['date_keys']">
									<span style="position: relative;">
										<a-form-item style="display: inline-block;margin-right:6px;"  v-for="(k, index) in form.getFieldValue('date_keys')" :required="false" :key="k">
											<a-date-picker :allowClear="false"  @openChange="openDateFn(index)" @change="onChangeDate" :format="dateFormat" v-decorator="[`date_picker[${k}]`,config_date,'date-picker']" :disabledDate="disabledDate"/>
											<a-icon type="close-circle" class="close" style="margin-right: 22px;cursor: pointer;font-size: 18px;color: #E51C23;" @click.native="datePickerDel(k,index)"  v-if="form.getFieldValue('date_keys').length > 1" />
										</a-form-item>
									</span>
									<a-button  style="margin:4px 0 0 10px;" icon="plus" @click.native="addDatePicker">
										添加日期
									</a-button>
								</div>
								<div v-decorator="['time_keys']">
										<span style="position: relative;">
											 <a-form-item style="display: inline-block;margin-right:6px;" v-for="(k,index) in  form.getFieldValue('time_keys')" :required="false" :key="k">
												<a-time-picker :disabledHours='getDisabledHours' :disabledMinutes='disabledMinutes'   :allowEmpty="false"   @openChange="openTimeFn(index)" @change="onChangeTime" format="HH:mm:ss" showTime  v-decorator="[`time_picker[${k}]`,config,'time-picker']"  />
												<a-icon type="close-circle"  class="close" style="margin-right: 22px;cursor: pointer;font-size: 18px;color: #E51C23;" @click.native="timePickerDel(k,index)"  v-if="form.getFieldValue('time_keys').length > 1" />
											 </a-form-item>
										</span>
									<a-button  style="margin:4px 0 0 10px;" icon="plus" @click.native="addTimePicker">
										添加时间
									</a-button>
								</div>
								<div class="time" v-if="timeShow.length"  ref="liCon">
									<template v-for="(item,index) in timeShow" >
										{{item}}{{timeShow.length==index+1||timeShow.length==1?'':'、'}}
									</template>
									<div class="more" v-for="(item,index) in timeShow" @click="open(timeShow)" v-if="timeShow.length>7">
										<img src="../../assets/up.png"   v-if="!timeShow.openFlag" />
										<img src="../../assets/down.png"  v-else />
									</div>
								</div>
							</div>
						</a-form-item>
						<a-form-item  label="推送间隔" v-bind="formItemLayout" v-if="pushType=='10'" style="margin-bottom:0;"> 
							<div>
								<a-input-number :min="2" :max="100" v-model="queryForm.msgInterval1" @change="msgIntervalChange"/>
								<span style="padding: 0 5px">~</span>
								<a-input-number :min="2" :max="100" v-model="queryForm.msgInterval2" @change="msgIntervalChange"/>
								<span style="padding: 0 5px">秒</span>
								<a-tooltip placement="right">
									<template slot='title'>
										<span>用于设置推送过程中推送消息的时间间隔。建议间隔不要设置过短，避免消息发送过快，导致发送过于频繁而失败！</span>
									</template>
									<a-icon type="question-circle" theme="filled"/>
								</a-tooltip>
							</div>
						</a-form-item>
						<a-form-item  label="推送终止" v-bind="formItemLayout" style="margin-bottom:8px;">
							<div>
								<a-radio-group @change="onChangeRadioDate" v-model="queryForm.overdue_status">
									<a-radio value="0">否</a-radio>
									<a-radio value="1">是</a-radio>
								</a-radio-group>
								<a-tooltip placement="right">
									<template slot='title'>
										<span>用于设置推送任务结束的时间，指定时间未推送的客户也将停止推送</span>
									</template>
									&nbsp;<a-icon type="question-circle" theme="filled"/>
								</a-tooltip>
								<div v-if="queryForm.overdue_status=='1'">
									<a-date-picker placeholder="默认时间" showTime  @change="getEndDate" format="YYYY/MM/DD HH:mm:ss" :disabledDate="disabledDate" :disabledTime='getDisabledHoursa'  />
								</div>
							</div>
						</a-form-item>
					</a-col>
					<a-col :span="24" class="col-margin" style="border-top: 1px solid #EDEDED;padding-top: 20px;padding-left:14px;">
						<a-row>
							<a-form-item   label="推送内容："  v-bind="formItemLayout">
								<a-col :span="24" style="padding: 0 20px 0 0">
									<!--<template v-if="view_material.length>0?true:false">-->
										<!--<view-material v-for="(item,index) in view_material" :key="item.id" :dataItem="item" @click="delMaterial()"></view-material>-->
									<!--</template>-->
									<template >
										<a-form-item v-for="(k,index) in  sendMsgContent" :required="false" :key="index" class="material_content" style="margin-bottom:2px;width:748px;">
											<div v-if="k.type==2" style="padding-left:8px;">
                                                <view-material  v-for="(item,index1) in k.materialItem" :key="item.id" :dataItem="item" @click="delMaterial(index,index1)" :isPush="pushType=='20'?'1':'0'"></view-material>
											</div>
											<a-textarea v-else v-model="k.content" :placeholder="pushType=='10'?'{微信备注名}您好，今天是您生日，可享受部分商品到店6折优惠。':'朋友圈推送'" :autosize="{'minRows': 4, 'maxRows': 6 }" :maxlength="pushType=='20'?700:500" style="width:748px;" />
											<a-icon
													v-if="index > 0"
													class='dynamic-delete-button'
													type='minus-circle-o'
													@click="() => remove(index)"
                                                    :style="{position:' absolute',left:k.type==2?'470px':'calc(100% + 130px)',top: '50%',transform: 'translateY(-50%)',cursor: 'pointer'}"
											/>
											<a-button :style="{position:' absolute',left:k.type==2?'370px':'calc(100% + 30px)',top: '50%',transform: 'translateY(-50%)',cursor: 'pointer'}" @click="useMaterial(index)">使用素材</a-button>
                                             <p v-if="!k.materialItem.length&&pushType=='10'" >在文本中输入标签系统替换对应的内容：<b @click="user(k,'{微信备注名}')" class="tag">{微信备注名}</b>，<b @click="user(k,'{微信昵称}')" class="tag">{微信昵称}</b>，<b @click="user(k,'{手机号}')" class="tag">{手机号}</b>，<b @click="user(k,'{客户生日}')" class="tag">{客户生日}</b></p>
                                        </a-form-item>
										<!--<a-form-item v-for="(k,index) in  form.getFieldValue('textarea_val')" :required="false" :key="k">-->
											<!--<a-textarea :value="queryForm.textareaVal" @change="textareaChange" placeholder="{用户姓名}您好，今天是您生日，可享受部分商品到店6折优惠。" :autosize="{'minRows': 4, 'maxRows': 6 }" v-decorator="[`textareaVal[${k}]`,{rules: [{ required: true, message: '请输入内容。。。', whitespace: true }]}]" />-->
											<!--<a-icon-->
											     <!--v-if="form.getFieldValue('textarea_val').length > 1"-->
											     <!--class='dynamic-delete-button'-->
											     <!--type='minus-circle-o'-->
											     <!--:disabled="form.getFieldValue('textarea_val').length === 1"-->
											     <!--@click="() => remove(k)"-->
											     <!--style="position: absolute;right: -26px;top: -26px;cursor: pointer;"-->
											   <!--/>-->
										<!--</a-form-item>-->
										
										<a-button type="dashed" @click.native="addTextarea" block icon="plus" style="width:748px">添加</a-button>
									</template>
								</a-col>
								<!--<a-col :span="3">-->
									<!--<a-button @click="useMaterial">使用素材</a-button>-->
								<!--</a-col>-->
							</a-form-item>
						</a-row>
						<!--<a-row>
							<a-col span="20">
								<a-form-item  label="保存素材："  v-bind="formItemLayout">
									<a-checkbox @change="checkBoxChange" v-model="sel_save_material"></a-checkbox>
								</a-form-item>
							</a-col>
						</a-row>-->
					</a-col>
					<!-- <a-col :span="2" style="margin-top: 20px">
					</a-col> -->
					<a-col :span="24" style="padding-top: 20px;border-top:1px solid #ededed;padding-left:14px;">
						<a-row>
							<a-col :span="14" style="padding: 0 20px 0 0;text-align: left;">
								<a-button type="primary" htmlType='submit'  :loading="saveLoading">确定</a-button>
								<a-button @click.native="cancel">取消</a-button>
							</a-col>
						</a-row>
					</a-col>
				</a-row>
			</a-form>
	
			<a-modal :title="visible==2?'选择客户':'选择标签'" :footer="null" :visible="visible>1?true:false" @cancel="com_handleCancel" width="1000px">
				<a-row justify="space-between">
					<a-col :span="10">
						<a-input-search placeholder="请输入搜索内容。。。" enterButton v-model="searchKey_friend" style="width: 200px" @search="onSearch_friend"  v-if="visible==2?true:false"/>
						<a-input-search placeholder="请输入搜索内容。。。" enterButton v-model="searchKey_user" style="width: 200px" @search="onSearch_user"  v-if="visible==3?true:false" />
						<a-icon v-if="visible==2&&searchKey_friend!=''" type="close-circle" @click="searchKey_friend=''" style="position: absolute;left: 135px;top: 50%;transform: translateY(-50%);cursor: pointer;z-index: 10" />
						<a-icon v-if="visible==3&&searchKey_user!=''" type="close-circle" @click="searchKey_user=''" style="position: absolute;left: 135px;top: 50%;transform: translateY(-50%);cursor: pointer;z-index: 10" />
                        <span v-if="visible==3" style="color:#FE6354">注意（仅展示有客户的标签）</span>
					</a-col>
					<a-col :span="14" class="pagination_box" style="text-align:right">
						<a-pagination v-if="visible==2" size="small" showLessItems='true' :defaultCurrent="pige" showQuickJumper showSizeChanger :pageSizeOptions="user_pagination.pageSizeOptions" :pagination="user_pagination" :total="user_pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="user_pagination.pageSize" v-model="user_pagination.current" @change="user_onShowSizeChange" @showSizeChange="user_optionChange"  />
						<a-pagination v-if="visible==3" size="small" showLessItems='true' :defaultCurrent="pige" showQuickJumper showSizeChanger :pageSizeOptions="label_pagination.pageSizeOptions" :pagination="label_pagination" :total="label_pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="label_pagination.pageSize" v-model="label_pagination.current" @change="select_user_onShowSizeChange" @showSizeChange="select_user_optionChange"  />
					</a-col>
				</a-row>
                <a-table  v-if="visible==3" :scroll="{y:380,x:false}" :columns="columns" :dataSource="userLabel" :locale="locale"  :pagination="false" type="checkbox"  :rowSelection="{selectedRowKeys: modalSelectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id"  :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" >
                    <template  slot="titleTag" slot-scope="text,record,index">
                        <div>
                            <span :class="['title-tagColor'+record.color_id]" style="border-radius:100%;width: 15px;height:15px;display:inline-block;margin-right:6px;vertical-align: sub"></span>
                            <span>{{record.title}}</span>
                            <!-- <a-badge status="success" :style="{background:'#ccc'}" color="#ccc" :text="record.title"></a-badge> -->
                        </div>
                    </template>
                </a-table>
                <a-table  v-if="visible==2" :columns="columns1" :dataSource="friendsId" :locale="locale"  :pagination="false" type="checkbox"  :rowSelection="{selectedRowKeys: modalSelectedRowKeys1, onChange: onSelectChangeCustorm}" :rowKey="(record) => record.id"  :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" >
                    <template slot="avatar_url" slot-scope="text,record,index">
                       <div>
                            <img v-if="!text" src='../../assets/defaluteImg.jpg' style="width: 30px;height: 30px;border-radius:100%">
                            <img :src="text?text:'../../assets/defaluteImg.jpg'" alt="" style="width: 30px;height: 30px;border-radius:100%">
                            <span>{{record.remark || record.nickname}}</span>
                       </div>
                    </template>
					<template slot="wx_type" slot-scope="text,record,index">
						<div>
							<span v-if="record.friend_user_name.indexOf('@openim')!=-1">企业微信</span>
							<span v-else>普通微信</span>
						</div>
					</template>
                    <template slot="robot_username" slot-scope="text,record,index">
                       <div>
                            <img v-if="!record.assistant_avatar" src='../../assets/defaluteImg.jpg' style="width: 30px;height: 30px;border-radius:100%">
                            <img :src="record.assistant_avatar?record.assistant_avatar:'../../assets/defaluteImg.jpg'" alt="" style="width: 30px;height: 30px;border-radius:100%">
                            <span>{{record.assistant_name}}</span>
                       </div>
                    </template>
                </a-table>
				<a-form >
					<a-form-item :wrapperCol="{span: 24}" style="margin-bottom: 0;text-align: right;">
						<a-button type='default' @click="com_cancel" style="margin:25px 20px 0 0;">取消</a-button>
						<a-button type='primary'  @click="com_handleOk">完成</a-button>
					</a-form-item>
				</a-form>				
			</a-modal>
			<a-modal :footer="null" :visible="visible==1?true:false" @cancel="com_handleCancel('3')" width="80%" >
				<template slot="title">
					<span style="font-size: 16px">使用素材</span>
					<span style="font-size: 12px;color: #5AA9CD">{{pushType=='20'?'(仅支持选择一种素材类型)':''}}</span>
				</template>
				<a-row >
					<a-col :xl="{span:8}" :lg="{span:12}">

					</a-col>
					<a-col :xl="{span:16}" :lg="{span:24}" class="pagination_box" style="margin-bottom: 0;position: relative;z-index: 10">
						<a-pagination showQuickJumper showSizeChanger :pageSizeOptions="pagination.pageSizeOptions" :pagination="pagination" :total="pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="pagination.pageSize" v-model="pagination.current" @change="onShowSizeChange" @showSizeChange="optionChange"  />
					</a-col>
				</a-row>
	
				<a-form :form="form" class="useMaterial">
					<a-checkbox-group  @change="sel_Material" v-model="modalIsChecked" style="margin: 0 5px 0 0;width: 100%;" class="checkbox_content sel_material">
						<a-tabs @change="tab_callback" type="card" class="modal_tabs" :activeKey="activeKey">
							<a-tab-pane tab="文本" key="1">
								<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="textData" style="margin-bottom: 0">
									<a-list-item slot="renderItem" slot-scope="item, index">
										<a-checkbox :value="item.id" style="width: 100%;">
											<div class="text">
												<div class="div-edit" v-html="item.content"></div>
											</div>
										</a-checkbox>
									</a-list-item>
								</a-list>
							</a-tab-pane>
							<a-tab-pane tab="图片" key="2">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="imgData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="img_box" style="width: 100%;height: 0;padding-bottom: 93%;position: relative;border-radius: 5px">
													<img alt="example" :src="item.mediapath" slot="cover" style="position: absolute;width:100%;height:100%;left: 0;top:0;object-fit: cover;padding: 4px"/>
												</a-card>
											</a-checkbox>
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="链接" key="3">
								<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="linkData">
									<a-list-item slot="renderItem" slot-scope="item, index">
										<a-checkbox :value="item.id" style="width: 100%;">
											<a-card hoverable class="link_box push-link-style" style="border-radius: 5px" v-if="pushType=='10'">
												<div style="color:#222;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden">{{item.title}}</div>
												<div class="crl">
													<div class="fl"  style="margin-top: 15px;max-width: calc(100% - 70px);font-size:12px;color:#838383;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.desc}}</div>
													<img class="fr" :src="item.mediapath" style="width:50px;height:50px;display: inline-block;border-radius: 5px" />
												</div>
											</a-card>
											<a-card hoverable class="link_box push-link-style" style="border-radius: 5px" v-if="pushType=='20'">
												<img class="fl" :src="item.mediapath" style="width:50px;height:50px;display: inline-block;border-radius: 5px" />
												<div style="color:#222;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: calc(100% - 95px);margin-left: 5px;overflow: hidden;display: inline-block;position: absolute;top: 50%;transform: translateY(-50%);">{{item.title}}</div>
											</a-card>
										</a-checkbox>
									</a-list-item>
								</a-list>
							</a-tab-pane>
							<a-tab-pane tab="名片" key="4" v-if="pushType=='10'">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="cardData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
                                                <!--<div class="publicCard link_box">-->
                                                    <!--<div class="carTop">-->
                                                        <!--<p class="imgHead"> {{item.title}} </p>-->
                                                        <!--<p class="contentCard"> {{item.alias}}</p>-->
                                                    <!--</div>-->
                                                    <!--<div class="context">-->
                                                        <!--公众号名片-->
                                                    <!--</div>-->
                                                <!--</div>	-->
												<div class="publicCard link_box" style="border-radius: 5px">
													<div style="height:56px;line-height: 56px;text-align: left;padding: 0 10px">
														<img src="../../assets/cardIcon.png" alt="" style="width: 30px;height: 30px">
														<span style="margin-right: 20px;color: #101010">{{item.title}}</span>
													</div>
													<div style="line-height: 25px;height: 25px;border-top: 1px solid #F0F0F0;color:#7D7D7D;padding: 0 10px;font-size: 12px">
														公众号名片
													</div>
												</div>
											</a-checkbox>
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="小程序" key="5" v-if="pushType=='10'">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="programData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
                                                <div class="contentSmall link_box" style="border-radius: 5px">
                                                    <!--<div class="titleSmall">-->
                                                        <!--<a-card-meta :title="item.title" :description="item.desc">-->
                                                            <!--<a-avatar slot="avatar" :src="item.iconurl" />-->
                                                        <!--</a-card-meta>-->
                                                    <!--</div>-->
                                                    <!--<div class="bgimgcover">-->
                                                        <!--<div  class="bgImg" :style="{ background:' url('+item.mediapath+') no-repeat center',backgroundSize:'cover',width:'100%',height:'100%'}"></div>-->
                                                    <!--</div>-->
                                                    <!--<div class="footerSmall">-->
                                                        <!--<img src="../../assets/logoSmall.png" alt="" style="width:30px;">-->
                                                        <!--<span>小程序</span>-->
                                                    <!--</div>-->
													<div style="line-height: 40px;height: 40px">
														<img :src="item.iconurl" style="width:20px;height: 20px;border-radius: 50%;vertical-align: middle" />
														<span style="color:#717171;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: calc(100% - 25px);overflow: hidden;display: inline-block;vertical-align: middle">{{item.title}}</span>
													</div>
													<div style="color:#222;max-height: 200px;overflow: hidden">
														{{item.desc}}
														<img :src="item.mediapath" style="width:100%;display: block;padding-top: 10px" />
													</div>
													<div style="color:#717171;height: 25px;line-height: 25px;width: calc(100% + 20px);margin-left: -10px;border-top:  1px solid #f0f0f0;font-size: 12px">
														<img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
														小程序,请在手机上查看
													</div>
                                                </div>
											</a-checkbox>
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="图文素材" key="6" v-if="pushType=='20'">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="text_imgData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="link_box push-friend" style="border-radius: 5px">
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
												</a-card>
											</a-checkbox>
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="文件素材" key="8" v-if="pushType=='10'">
								<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="fileData">
									<a-list-item slot="renderItem" slot-scope="item, index">
										<a-checkbox :value="item.id" style="width: 100%;">
											<a-card hoverable class="link_box push-friend" style="border-radius: 5px">
												<div class="ant-card-meta" style="max-height: 120px;overflow:hidden;position:relative;">
													<div style="width: 80%;word-break: break-all;color: #101010;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.title}}</div>
													<div style="position: relative;margin-top: 10px">
														<span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{item.desc}}</span>
													</div>
													<div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 10px;transform: translateY(-50%);border-radius: 4px">
														<img src="../../assets/file-img1.png" alt="">
													</div>
												</div>
											</a-card>
										</a-checkbox>
									</a-list-item>
								</a-list>
							</a-tab-pane>
                            <a-tab-pane tab="视频素材" key="7" >
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="videoData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="link_box push-friend" style="border-radius: 5px">
													<div class="ant-card-meta" style="text-align: center;max-height: 120px;overflow:hidden;position:relative;">
													<div class="video" >
                                                        <a-icon type="play-circle" class="vidoIcon"></a-icon>
                                                    </div>
                                                        <video   style="width:100%" >
                                                            <source :src="item.mediapath" type="video/mp4">
                                                        </video>
													</div>
												</a-card>
											</a-checkbox>
										</a-list-item>
									</a-list>
							</a-tab-pane>
						</a-tabs>
					</a-checkbox-group>
					<a-form-item :wrapperCol="{span: 24}" style="margin-bottom: 0;border-top:1px solid #E5E5E5 ;text-align: right;">
						<span v-if="pushType=='20'&&activeKey=='7'" style="color: #FE6354;float: left;margin-top: 22px">注意：视频大小不超过10M，时长不超过15秒</span>
						<a-button type='default' @click="com_cancel('3')" style="margin:25px 20px 0 0;">取消</a-button>
						<a-button type='primary' :disabled="disabled" @click="com_handleOk('3')">完成</a-button>
					</a-form-item>
				</a-form>
			</a-modal>
	
			<div v-if="fixed_show" class="fixed_success">
				<div class="center_box">
					<div>
						<a-icon class="icon" type="check-circle" style=""></a-icon>
						<div class="decs">提交成功</div>					
					</div>
					<div class="text">
						<p>1.点击“完成”进入列表页面</p>
						<p>2.点击“克隆”复制前一条推送信息并跳到新建页面</p>
					</div>
					<div class="btn_box clearFloat">
						<a-button class="fl" type='primary' @click="cancel">完成</a-button>
						<a-button class="fr" type='primary' @click="cloneFn">克隆</a-button>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	var emoji = require('../../common/emojiMap');
    var comConf=require('../../common/comConfig')
	import viewMaterial from './viewMaterial'
	import moment from 'moment';
	import 'moment/locale/zh-cn';
    moment.locale('zh-cn');
    
	var myDate = new Date(); //获取系统当前时间
	let id = 0
	export default {
		name: "NewPush",
		components: {
			viewMaterial,
            VNodes: {
                functional: true,
                render: (h, ctx) => ctx.props.vnodes
            }
		},
		data() {
			window.form = this
			return {
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                pige:1,
				provinceData: [{//发送内容选择框数据
					'key': '1',
					'val': '文本'
				}, {
					'key': '2',
					'val': '图片'
				}, {
					'key': '3',
					'val': '链接'
				}, {
					'key': '4',
					'val': '名片'
				}, {
					'key': '5',
					'val': '小程序'
				}, {
					'key': '6',
					'val': '图文素材'
				},{
					'key': '7',
					'val': '视频素材'
				}],
				formItemLayout: {
			        labelCol: {
			          lg: { span: 24 },
			          xl: { span: 2 },
			        },
			        wrapperCol: {
			          lg: { span: 22 },
			          xl: { span: 20 },
			        },
                },
                labelList:[],
                userList:[],
                userLiatAll:[],
                columns:[
                    {
                    title:'标签名称',
                    width: "75%",
                    align:'left',
                    scopedSlots:{
                        customRender:'titleTag'
                    }
                    },
                    {
                    title:'标签人数',
                    width: "15%",
                    align:'left',
                    dataIndex: 'friendNum',
                    }
                ],
                columns1:[
                    {
                        title:'客户名称',
                        width: 100,
                        align:'left',
                        dataIndex:'avatar_url',
                        scopedSlots: {
                            customRender: 'avatar_url'
                        }
                    },
                    {
                        title:'客户类型',
                        width: 100,
                        align:'left',
                        dataIndex:'wx_type',
                        scopedSlots: {
                            customRender: 'wx_type'
                        }
                    },
                    {
                        title:'所属微信号',
                        width: 100,
                        align:'left',
                        scopedSlots: {
                            customRender: 'robot_username'
                        }
                    },
                ],
                modalSelectedRowKeys:[],
                modalSelectedRowKeys1:[],
				modal_isRadio: '', //弹窗框点击选择单选素材
                modalIsChecked:[],  //弹窗多选的素材
                sendMsgContent:[{
				    type:'1',
					content:'',
                    materialItem:[]
				}],//发送内容数组
				selectMateriaIndex:'',
				dateFormat: 'YYYY/MM/DD',//日期格式
				queryForm: {
					task_name:'',
					friendsId: [], //好友id [1,2]
//					userChecked: false, //true-排除当前选择 -- 用户
                    userLabel: [], //用户标签 [1,2]
//					friendsChecked: false, //true-排除当前选择--机器人
					sendValue: 20, //10 定时发送 20 立即发送
					timePicker: moment(), //当前时间
					datePicker: moment(), //当前日期
					textareaVal: '', //文本域
					visble_type:10,		//10 公开 20 部分可见 30 不给谁看
                    department_id:'',
                    msgInterval1:10,
                    msgInterval2:15,
                    pushData:'',
					overdue_time:'',
                    overdue_status:'0',//0否 1是
				},
				timePicker_index:'',//当前时间索引
				datePicker_index:'',//当前日期索引
				sel_save_material:false,//保存素材选择框
				view_material: [], //展示选择素材
				timePickerArr: [],//选择时间
				datePickerArr: [],//选择日期
				textareaValArr: [],//素材输入框
                timeShow: [],//创建日期和时间集合
                pushTimeShow: [],//创建日期和时间集合
				userLabel: [], //用户标签 [1,2]
				allUserLabel:[],//全部用户标签
				friendsId: [], //好友id [1,2]
				userTotal: 0, //用户总数
				fixed_show:false,//显示完成界面
				config: {//自定义验证
					rules: [{
						type: 'object',
						required: true,
						message: '请选择时间!'
					}],
				},
				config_date: {
					rules: [{
						type: 'object',
						required: true,
						message: '请选择日期!'
					}],
				},
				liConHeight: 49, // 两行文字的高度
                pushType:this.$route.query.pushType,
                pushTypeInc:this.$route.query.pushTypeInc,
				/*----model 数据 start----*/
				text_imgData: [],//图文素材
				programData: [],//小程序素材
				cardData: [],//名片素材
				linkData: [],//链接素材
				textData: [],//文字素材
                imgData: [],//图片素材
                videoData:[],//视频素材
                fileData:[],//文件素材
				materialDataSelect:[],
				visible: false,//model 显示
				disabled: true,//model 是否禁用完成按钮
				pagination: { //素材分页
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
				},
				user_pagination: { //用户标签分页
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
				},
				label_pagination: { //用户标签分页
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
				},
                select_user:[],//用户昵称集合
                select_user_list:[],
				select_label:[],
				numTotal:0,
				searchKey:'',//modal弹出框搜索
				searchKey_friend:'',
				searchKey_user:'',
				activeKey: '1',//tabs组件 当前激活 tab 面板的 key
				userLabelList:[],
				
				/*----model 数据 end----*/
                isRouter:false,
                departmentList:[],
				selectDepartment:[],
                wxList:[],
				selectWxlist:[],
				timeFlag:true,//判断是不是当天
				minuteFlag:[],
                sendMsgWarnStatus:'0',
                saveLoading:false
			}
		},
		watch: {
			'modalIsChecked': {
				handler: function(value) {
					value ? this.disabled = false : this.disabled = true;
				},
				deep: true
			}
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},

		computed: {
			departmentID() {
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
		},
		methods: {
            moment,
            okPushDate(bool){
                if(this.queryForm.pushData&&!bool && this.pushTimeShow.length<5){
                    this.pushTimeShow.push(this.queryForm.pushData)
                }else if(bool&&this.pushTimeShow.length>=5){
                    this.$message.warn('最多可选择5个时间')
                }
            },
            onSelectChange(keys){
                this.modalSelectedRowKeys = keys;
                let arr = [];
                this.allUserLabel.forEach(el=>{
                    keys.forEach(item=>{
                        if(el.id === item){
                            arr.push(el)
                        }
                    })
                })
                this.select_label = arr
            },
            onSelectChangeCustorm(keys){
                this.modalSelectedRowKeys1 = keys;
                let arr = [];
                this.userListAll.forEach(el=>{
                    keys.forEach(item=>{
                        if(el.id === item){
                            arr.push(el)
                        }
                    })
                })
                this.select_user = arr; 
            },
            getPushDate(prm,val){
                this.queryForm.pushData = val
            },
            deleteTime(index){
                this.pushTimeShow.splice(index,1)
            },
			getEndDate(prm,val){
				this.queryForm.overdue_time = val
			},
            user(val,text){
                val.content= val.content+text+' '
            },
			optionChange(current, pageSize) {//素材分页
                this.pagination.current = current;
				this.pagination.pageSize = pageSize;
				this.getMaterialData();
			},
			onShowSizeChange(page, pageSize) {//素材分页
				this.pagination.current = page;
				this.getMaterialData();
			},
			user_onShowSizeChange(page, pageSize){//用户分页
				this.user_pagination.current = page;
				this.getUserList();
			},
			user_optionChange(current, pageSize) {//用户分页
                this.user_pagination.current = current
				this.user_pagination.pageSize = pageSize;
				this.getUserList();
			},
			
			select_user_onShowSizeChange(page){//标签分页
				this.label_pagination.current = page;
//				this.refreshGroup();
                this.userLabel = this.allUserLabel.slice((page - 1) * this.label_pagination.pageSize, page * this.label_pagination.pageSize)
			},
			select_user_optionChange(current,pageSize) {//标签分页
                this.label_pagination.current = 1
				this.label_pagination.pageSize = pageSize;
//				this.refreshGroup();
                this.userLabel = this.allUserLabel.slice(0, pageSize)
			},
			
//			onChangeUser(e) { //排除用户标签
//				console.log(`checked = ${this.queryForm.userChecked}`)
//				this.queryForm.userChecked = !this.queryForm.userChecked;
//				this.getLabelTotal();
//			},
//			onChangeRobot(e) { //true-排除当前好友
//				console.log(`checked = ${e.target.checked}`)
//				this.queryForm.friendsChecked = !this.queryForm.friendsChecked;
//				this.getLabelTotal();
//			},
			onChangeRadioDate(val){
				console.log(val)
			},
			onChangeRadio(e){
				this.queryForm.visble_type = e.target.value;
				this.getLabelTotal();
			},
//			handleChangeRobot(value) { //用户标签
//				this.queryForm.userLabel = value;
//			},
			clickChangeUser(num){//选择用户标签弹窗
				if(num==2){
					this.user_pagination.current = 1;
					this.searchKey_friend = ''
                    this.getUserList();
				}else{
					this.searchKey_user = ''
                    this.label_pagination.current = 1
                    this.refreshGroup();
				}
				this.visible = num;
			},
			
            clear_label_user(index){//清除用户已选择签
                this.modalSelectedRowKeys.splice(index,1);
                this.select_label.splice(index,1)
                // this.userLabelList.splice(index,1)
				// this.select_user_filter();
				// if(this.queryForm.userLabel.length==0){
				// 	this.form.resetFields('userLabel', {
				// 		initialValue: []
				// 	})
				// }
                // this.userLabelList = [];
				this.getLabelTotal();
			},
            close_user_tag(e,item,index) {
                e.preventDefault()
                this.queryForm.userLabel.splice(index,1);
                this.userLabelList.splice(index,1)
                this.select_user_filter();
                if(this.queryForm.userLabel.length==0){
                    this.form.resetFields('userLabel', {
                        initialValue: []
                    })
                }
                this.getLabelTotal();
            },
            clear_user(index){//清除好友id已选择签
                this.modalSelectedRowKeys1.splice(index,1);
                this.select_user.splice(index,1)
                // this.queryForm.friendsId.splice(index,1);
                // this.select_user_list.splice(index,1);
				// this.user_filter();
				// if(this.queryForm.friendsId.length==0){
				// 	this.form.resetFields('friendsId', {
				// 		initialValue: []
				// 	})
				// }
				this.getLabelTotal();
			},
            clear_user_all(){//清除好友id已选标签 选择客户
                this.modalSelectedRowKeys1 = []
                this.select_user = []
				// this.form.resetFields('friendsId', {
				// 	initialValue: []
				// })
                // this.queryForm.friendsId = [];
                // this.select_user_list = [];
				// this.user_filter();
				this.getLabelTotal();
			},
			
			clear_label_all(){
                this.modalSelectedRowKeys = [];
                this.select_label = []
				// this.form.resetFields('userLabel', {
				// 	initialValue: []
				// })
                // this.queryForm.userLabel = [];
                // this.userLabelList = [];
				// this.select_user_filter();
				this.getLabelTotal();
			},
//			handleChangeUser(value) { //选择好友id标签
//				this.queryForm.friendsId = value;
//			},
            clearLabel() { //清除所有标签
//				this.form.resetFields('friendsId', {
//					initialValue: []
//				})
//				this.form.resetFields('userLabel', {
//					initialValue: []
//				})
				this.queryForm.friendsId = [];
                this.queryForm.userLabel = [];
                this.userLabelList = [];
				this.user_filter();
				this.select_user_filter();

                this.modalSelectedRowKeys1 = [];
                this.select_user = [];
                this.modalSelectedRowKeys = [];
                this.select_label = []
				this.getLabelTotal();
			},
			onChangeSend(e) { //10 定时发送 20 立即发送
				this.queryForm.sendValue = e.target.value;
			},
			
			openTimeFn(index){
				this.timePicker_index = index;//当前时间索引
			},
			openDateFn(index){
				this.datePicker_index = index;//当前日期索引
			},
			onChangeDate(time) { //选择日期
				let index = this.datePicker_index;
				// console.log(this.datePicker_index)
				let that = this;
				this.form.getFieldValue('date_keys').forEach((item)=>{
					that.datePickerArr.push('');
				});
				this.datePickerArr.splice(index,1,time.format('YYYY-MM-DD')); 
				time.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')? this.timeFlag= true:this.timeFlag = false;
				// console.log(this.timeFlag)
				// console.log('日期',time.format('YYYY-MM-DD'))
				// console.log('index',index)
				// console.log('长度',this.datePickerArr.length)
				this.queryForm.datePicker = time;
				this.mergeTime();
			},
			onChangeTime(time) { //选择时间
				let index = this.timePicker_index;
				time.format('HH')  === moment().startOf('hour').format('HH')? this.minuteFlag[this.timePicker_index]= true :this.minuteFlag[this.timePicker_index] = false;
				this.form.getFieldValue('time_keys').forEach(item=>{
					this.timePickerArr.push('');
				});
				this.timePickerArr.splice(index,1,time.format('HH:mm:ss'));
				console.log('时间',time.format('HH:mm:ss'))
				console.log('index',index+1)
				console.log('长度',this.timePickerArr.length)
				
				this.queryForm.timePicker = time;
				this.mergeTime();
            },
			mergeTime() {//处理时间
				this.timeShow = [];
				let datePickerArr = this.datePickerArr;
				let timePickerArr = this.timePickerArr;
				for(let i = 0; i < datePickerArr.length; i++) {
					for(let j = 0; j < timePickerArr.length; j++) {
						if(datePickerArr[i]&&timePickerArr[j]){
							this.timeShow.push(datePickerArr[i] + ' ' + timePickerArr[j]);
						}
					}
				}
				this.timeShow = this.timeShow.filter((item, index)=> {
						return this.timeShow.indexOf(item) === index
				})
			},
			timePickerDel(k, index) { //删除时间
				this.timePickerArr.splice(index, 1)
				this.mergeTime();
				const {
					form
				} = this
				const time_keys = form.getFieldValue('time_keys');
				form.setFieldsValue({
					time_keys: time_keys.filter(key => key !== k),
				})
			},
			datePickerDel(k, index) { //删除日期
				this.timeFlag = false;
				this.datePickerArr.splice(index, 1)
				this.mergeTime();
				const {
					form
				} = this
				const date_keys = form.getFieldValue('date_keys')
				form.setFieldsValue({
					date_keys: date_keys.filter(key => key !== k),
				})
			},
			addTimePicker() { //添加时间
				const {
					form
				} = this;
				const time_keys = form.getFieldValue('time_keys')
				const nextKeys = time_keys.concat(++id);
				form.setFieldsValue({
					time_keys: nextKeys,
				})
			},
			addDatePicker() { //添加日期
				const {
					form
				} = this;
				const date_keys = form.getFieldValue('date_keys')
                const nextKeys = date_keys.concat(++id);
				form.setFieldsValue({
					date_keys: nextKeys,
				})
			},
			open(item) {
				const liCon = this.$refs.liCon
				var height = liCon.offsetHeight
				if(height === this.liConHeight) { // 展开
					liCon.style.height = 'auto'
					height = liCon.offsetHeight
					liCon.style.height = this.liConHeight + 'px'
					var f = document.body.offsetHeight // 必加
					liCon.style.height = height + 'px'
				} else { // 收缩
					liCon.style.height = this.liConHeight + 'px'
				}
				if(!item.openFlag) {
					this.$set(item, 'openFlag', true)
				} else {
					this.$set(item, 'openFlag', false)
				}
			},
			
			tab_callback(key) {//model tab切换
				this.activeKey = key;
				this.getMaterialData();
				if(this.pushType=='20') {
                    this.modalIsChecked = []
				}
			},
            remove(index){//删除输入框
                this.sendMsgContent.splice(index,1)
            },
//			remove(k){//删除输入框
//				const { form } = this;
//				const keys = form.getFieldValue('textarea_val');
//				form.setFieldsValue({
//			        textarea_val: keys.filter(key => key !== k),
//				});
//			},
			sel_label(checkedValues){
                // console.log(checkedValues)
                this.queryForm.userLabel = checkedValues;
                // console.log(this.queryForm.userLabel)
				this.form.setFieldsValue({
                    userLabel: checkedValues
                })
				this.select_user_filter();
				this.getLabelTotal();
			},
            sel_select_user(checkedValues){//选择好友id标签
                this.queryForm.friendsId = checkedValues;
                // console.log(this.queryForm.friendsId)
				this.form.setFieldsValue({
					friendsId: checkedValues
				})
				this.user_filter();
				this.getLabelTotal();
			},
			select_user_filter(){
                //处理用户标签
				let that = this;
                let num = 0;
                if(!that.queryForm.userLabel.length){
                    that.userLabelList = [];
                    that.numTotal = 0
                }
                this.userLabelList.forEach((el,idx)=>{
                    let flag =false
                    that.queryForm.userLabel.forEach(item=>{
                        if(el.id==item) {
                            flag=true
                        }
                    })
                    if(!flag) {
                        that.userLabelList.splice(idx,1)
                    }
                })
                this.userLabel.forEach((e,idx)=>{
                    that.queryForm.userLabel.forEach(item=>{
						if(item == e.id){
				  			num = num + parseInt(e.friendNum);
							that.numTotal = num;
							that.userLabelList.push(e)
				  		}
                    })
                })
                this.userLabelList = comConf.arrayUnique(this.userLabelList,'id')
                this.select_label = this.userLabelList;
			},
			user_filter(){//处理好友id标签
				let that = this;
                if(!that.queryForm.friendsId.length){
                    that.select_user_list = [];
                }
                this.select_user_list.forEach((el,idx)=>{
                    let flag =false
                    that.queryForm.friendsId.forEach(item=>{
                        if(el.id==item) {
                            flag=true
						}
					})
					if(!flag) {
                        that.select_user_list.splice(idx,1)
					}
                })
				this.queryForm.friendsId.forEach((val)=>{
					that.friendsId.forEach((item)=>{
						if(val==item.id){
                            that.select_user_list.push(item)
						}
					})
                })
                this.select_user_list = comConf.arrayUnique(this.select_user_list,'id')
                this.select_user = this.select_user_list;
			},
    		sel_Material(checkedValue) {
			    if(this.pushType=='20'&&checkedValue.length!=0) {
			        if(this.activeKey!=2) {
                        this.modalIsChecked = [checkedValue[checkedValue.length -1 ]]
					}else {
                        this.modalIsChecked = checkedValue
					}
				}else {
                    this.modalIsChecked = checkedValue
				}
				console.log('modalIsChecked',this.modalIsChecked)
			},
            // sel_Material(checkedValue) {
            //        if(checkedValue.length>1){
            //            checkedValue.splice(0,1)
            //        }
            //         this.modalIsChecked = checkedValue
            //         this.com_handleOk('3')
            //         this.visible = false;
            // },
//			sel_Material(e) { //选择素材
//				let allList = this.activeKey==1?this.textData:
//				this.activeKey==2?this.imgData:
//				this.activeKey==3?this.linkData:
//				this.activeKey==4?this.cardData:
//				this.activeKey==5?this.programData:
//				this.activeKey==6?this.text_imgData:"";
//				this.modal_isRadio = e.target.value;
//				console.log('checked = ', e.target.value)
//
//				this.view_material = [];
//				for(let val of allList){
//					if(val.id == e.target.value){
//						this.view_material.push(val);
//						return false;
//					}
//				}
//			},
			useMaterial(index) { //使用素材按钮
				if(this.selectMateriaIndex!=index) {
                    this.modalIsChecked = []
				}
				this.selectMateriaIndex = index
				this.getMaterialData();
				this.visible = 1;
			},
			checkBoxChange(e) { //保存素材选择框
				this.sel_save_material = e.target.checked;
				console.log('保存素材选择框==',this.sel_save_material)
			},
			com_handleCancel(type) { //modal弹出框取消
                if(type==3) {
                    this.view_material = [];
                }else {
                    if(this.visible==2) {
                        this.select_user = []
                        this.modalSelectedRowKeys1 = [];
                    }else {
                        this.select_label = [];
                        this.modalSelectedRowKeys = [];
                    }
                    this.getLabelTotal()
                }
                this.visible = 0;
                this.modal_isRadio = '';
			},
			onSearch_friend(value){
				this.searchKey_friend = value;
                this.user_pagination.current = 1
				this.getUserList();
			},
			onSearch_user(value){
				this.searchKey_user = value;
                this.label_pagination.current = 1
				this.refreshGroup();
			},
			onSearch(value) { //modal弹出框搜索
				this.searchKey = value;
				this.getMaterialData();
			},
            delMaterial(index,itemIndex){//删除素材
                this.sendMsgContent[index].material_id.splice(itemIndex,1)
                this.sendMsgContent[index].materialItem.splice(itemIndex,1)
				if(this.sendMsgContent[index].materialItem.length==0) {
                    this.sendMsgContent[index].type= '1'
				}
            },
//			delMaterial(){//删除素材
//				this.modal_isRadio = '';
//				this.view_material = [];
//			},
			com_cancel(type) {//modal弹出框关闭
                if(type==3) {
                    this.view_material = [];
                }else {
                    if(this.visible==2) {
                        this.select_user = []
                        this.modalSelectedRowKeys1 = [];
                    }else {
                        this.select_label = [];
                        this.modalSelectedRowKeys = [];
                    }
                    this.getLabelTotal()
                }
                this.visible = false;
                this.modal_isRadio = '';
			},
            com_handleOk(type) { //modal弹出框选择
				if(type=='3') {
				    if(this.pushType == '20'&&this.modalIsChecked.length>9) {
                        this.$message.warning('最多只能选取九张图片');
                        return
					}
					let array = [],flag = false
                    this.modalIsChecked.forEach(item=>{
                        this.materialDataSelect.forEach(el=>{
                            if(el.id ==item) {
                                if(this.pushType == '20'&&el.type==11) {
                                    if(el.video_time<=15) {
                                        array.push(el)
                                    }else {
                                        flag = true
                                        this.$message.warn('当前视频时长' + el.video_time+'s,请重新选择视频时长不超过15s')
                                    }
                                }else {
                                    array.push(el)
                                }
                            }
                        })
                    })
					if(!flag) {
                        this.sendMsgContent[this.selectMateriaIndex].type = '2';
                        this.sendMsgContent[this.selectMateriaIndex].material_id = this.modalIsChecked
                        this.sendMsgContent[this.selectMateriaIndex].materialItem = array
                        this.visible = false;
					}else {

					}
				}else {
				    this.getLabelTotal()
                    this.visible = false;
				}

			},
			textareaChange(e) {//素材输入框
				//				this.queryForm.textareaVal = e.target.value;
				this.textareaValArr.push(e.target.value);
			},

            addTextarea() {
                if(this.pushType==20) {
                    if(this.sendMsgContent[0].type=='2') {
                        let flag = true
                        this.textData.forEach(el=>{
                            if(el.id==this.sendMsgContent[0].material_id[0]) {
                                flag = false
                            }
                        })
						if(flag) {
                            this.$message.warning('第一条是素材，第二条不能是文本');
                            return false;
						}
					}
                    if(this.sendMsgContent.length > 1) {
                        this.$message.warning('朋友圈推送消息数不能超过两个');
                        return false;
					}
				}
				if(this.sendMsgContent.length > 2) {
					this.$message.warning('消息数不能超过3个');
					return false;
				}
                this.sendMsgContent.push({
					type:'1',
					content:'',
                    materialItem:[]
				})
			},
//			addTextarea() { //添加textArea
//				const {
//					form
//				} = this;
//				const textarea_val = form.getFieldValue('textarea_val');
//				if(textarea_val.length > 2) {
//					this.$message.warning('消息数不能超过3个');
//					return false;
//				}
//				const nextKeys = textarea_val.concat(++id)
//				form.setFieldsValue({
//					textarea_val: nextKeys,
//				})
//			},
			cancel() { //返回上一级页面 company/incPushMange/incPrivatePush
				//10 私聊推送 20 朋友圈推送
                this.isRouter = true
               console.log( this.pushTypeInc)
                let jump_url;
               if(this.pushTypeInc){
                   jump_url = this.pushTypeInc == '10'?'/company/incPushMange/incFriendCirclePush':'/company/incPushMange/incPrivatePush';
               }else{
                  jump_url = this.pushType == '10'?'/pushMange/privatePush':'/pushMange/friendCirclePush';
               }
                
                
				this.$router.push({
					path: jump_url
				});
			},
			cloneFn(){
                this.isRouter = false
				this.fixed_show = false;
                this.saveLoading = false
			},
			async handleSubmit(e) {//提交
				let that = this;
                this.saveLoading = true
				if(this.pushType=='20') {
				    if(that.sendMsgContent.length>1) {
                        if(that.sendMsgContent[1].type=='1') {
                            this.$message.warning('第二段必须为素材');
                            this.saveLoading = false
                            return false
                        }
                        if(this.sendMsgContent[0].type=='2') {
                            let flag = true
                            this.textData.forEach(el=>{
                                if(el.id==this.sendMsgContent[0].material_id[0]) {
                                    flag = false
                                }
                            })
                            if(flag) {
                                this.$message.warning('第一条不是文本素材，不能添加第二条消息');
                                this.saveLoading = false
                                return false;
                            }
                            if(that.sendMsgContent[1].type=='2') {
                                let flag2 = true
                                this.textData.forEach(el=>{
                                    if(el.id==that.sendMsgContent[1].material_id[0]) {
                                        flag2 = false
                                    }
                                })
                                if(!flag&&!flag2) {
                                    this.$message.warning('不能发送两段文字素材');
                                    this.saveLoading = false
                                    return false
                                } else if(flag&&flag2) {
                                    this.$message.warning('不能发送两段素材');
                                    this.saveLoading = false
                                    return false
                                } else {
                                    let flag3 = true
                                    this.text_imgData.forEach(el=>{
                                        if(el.id==that.sendMsgContent[0].material_id[0]||el.id==that.sendMsgContent[1].material_id[0] ) {
                                            flag3 =false
                                        }
                                    })
									if(!flag3) {
                                        this.$message.warning('图文素材必须单独使用')
                                        this.saveLoading = false
                                        return false
									}
                                }
							}
                        }
						if(that.sendMsgContent[0].type=='1') {
				            if(that.sendMsgContent[1].type=='1') {
                                this.$message.warning('不能发送两段文字');
                                this.saveLoading = false
                                return false
							} else {
				                let flag4 = true
                                let flag5 = true
                                this.text_imgData.forEach(el=>{
                                    if(el.id==that.sendMsgContent[1].material_id[0] ) {
                                        flag4 = false
									}
								})
								if(!flag4) {
                                    this.$message.warning('图文素材必须单独使用');
                                    this.saveLoading = false
                                    return false
								}
                                this.textData.forEach(el=>{
                                    if(el.id==that.sendMsgContent[1].material_id[0] ) {
                                        flag5 = false
                                    }
                                })
                                if(!flag5) {
                                    this.$message.warning('不能发送两段文字');
                                    this.saveLoading = false
                                    return false
				                }
							}
						}
					}
				}
				if(this.sendMsgContent.length<2&&!this.sendMsgContent[0].materialItem.length&&this.sendMsgContent[0].content===''){
					this.$message.warning('推送内容不能为空');
                    this.saveLoading = false
					return false
				}
                //                    敏感词检测
                try {
                    let text =''
                    that.sendMsgContent.forEach(el=>{
                        if(el.type==1) {
                            text +=el.content
                        }
                        if(el.type==2) {
							el.materialItem.forEach(item=>{
                                if(item.type=='1') {
                                    text +=item.content
								}
							})
						}
                    })
                    if(text!='') {
                        let res = await this.$axios.post('/index.php?r=uc/risk/check-sensitive-words',{
                            content:text
                        })
                        let udata = res.data
                        if (udata.status == 1) {
                            if(udata.data.type=='0') {
                                this.sendMsgWarnStatus = '0'
                            }else if(udata.data.type=='1') {
                                if(this.sendMsgWarnStatus=='1') {
                                    //已经处于告警状态
                                    this.sendMsgWarnStatus = '0'
                                }else {
                                    this.sendMsgWarnStatus = '1'
                                    let text1 = udata.data.list.join()
                                    this.$message.warning('发送内容包含敏感词('+ text1 +')，确认保存？')
                                    this.saveLoading = false
                                    return
                                }
                            }else if(udata.data.type=='2'){
                                this.sendMsgWarnStatus = '2'
                                let text1 = udata.data.list.join()
                                this.$message.warning('发送内容包含敏感词('+ text1 +')，无法保存')
                                this.saveLoading = false
                                return
                            }
                        }
                    }

                } catch (err) {
                    this.saveLoading = false
                    this.$message.error('检测敏感词出错',err)
                }
				this.form.validateFields((err, fieldsValue) => {
					if(err) {
				        if(that.queryForm.sendValue==20&&(!!err.date_picker||!!err.time_picker)) {
						}else {
                            return
						}
					}
					let datePicker = [];
					let timePicker = [];
					let textareaValArr = [];
					if(!that.queryForm.task_name){
						this.$message.warning('任务名称不能为空');
                        this.saveLoading = false
						return
					}
					if(that.queryForm.sendValue == 10) {//10 定时发送 20 立即发送
						for(let i = 0; i < fieldsValue.date_picker.length; i++) {
							if(fieldsValue.date_picker[i]) {
								datePicker.push(fieldsValue.date_picker[i].format('YYYY-MM-DD'));
							}
						}
						for(let j = 0; j < fieldsValue.time_picker.length; j++) {
							if(fieldsValue.time_picker[j]) {
								timePicker.push(fieldsValue.time_picker[j].format('HH:mm:ss'));
							}
						}
						
						delete fieldsValue.date_picker;
						delete fieldsValue.time_picker;
					}
					
					delete fieldsValue.date_keys;
					delete fieldsValue.time_keys;

//					if(that.view_material.length==0){//没有选择素材
//
//						for(let s = 0; s < fieldsValue.textareaVal.length; s++) {
//							if(fieldsValue.textareaVal[s]) {
//								textareaValArr.push(fieldsValue.textareaVal[s]);
//							}
//						}
//					}
					
					delete fieldsValue.textarea_val;
					delete fieldsValue.textareaVal;
                    datePicker = [...new Set(datePicker)]
                    timePicker = [...new Set(timePicker)]
					const values = {
						...fieldsValue,
						'datePicker': datePicker,//日期
						'timePicker': timePicker,//时间
						'textareaVal': textareaValArr//输入框内容
					}
					let departmentInfo=[]
                    that.wxList.forEach(item=>{
                        that.selectWxlist.forEach(el=>{
                            if(item.assistant_id==el) {
                                departmentInfo.push({
                                    department_id:item.department_id,
                                    assistant_username:item.username
                                })
							}
                        })
					})
					this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/sale/push-add',
						data: Object.assign(values, {
//							'save_material': that.sel_save_material,	//是否保存素材
							'task_name':that.queryForm.task_name, //任务名称
							'pushType':      	that.pushType, //10 私聊推送 20 朋友圈推送
//							'userChecked':   	that.queryForm.userChecked, //true-排除当前选择 -- 用户
//							'friendsChecked':   that.queryForm.friendsChecked, //true-排除当前好友
							'visble_type':        that.queryForm.visble_type, //10 公开 20 部分可见 30 不给谁看
							'sendValue':        that.queryForm.sendValue, //10 定时发送 20 立即发送
							'FriendsNum':    	that.userTotal, //顾客个数
							'data': that.sendMsgContent,
							'department_id': departmentInfo,
//                            'department_id': that.queryForm.department_id,
                            'msgInterval1':that.queryForm.msgInterval1, //消息间隔相关参数
                            'msgInterval2':that.queryForm.msgInterval2, //消息间隔相关参数
                            'overdue_time':that.queryForm.overdue_time,//推送终止时间
							'overdue_status':that.queryForm.overdue_status,//是否推送终止
							'friendsId':that.queryForm.friendsId,
							'userLabel':that.queryForm.userLabel
						}) // 参数
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.$message.success('发送成功', 2);
							that.fixed_show = true;
							that.isRouter = true
                            that.saveLoading = false
						}else{
                            that.saveLoading = false
                        }
					});
				})
			},
			getMaterialData() { //获取所有素材接口
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material',
					data: {
						'department_id': that.departmentID,
						'all': 1,
						'searchKey':that.searchKey,
						'p': that.pagination.current,
						'n': that.pagination.pageSize,
						'type':that.activeKey==1?1:that.activeKey==2?2:that.activeKey==3?3:that.activeKey==4?7:that.activeKey==5?8:that.activeKey==6?9:that.activeKey==7?11:that.activeKey==8?10:"",
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					console.log(udata )
					if(udata.status == 1) {
						that.pagination.total = parseInt(udata.data.total); //数据总条数
                        !!udata.data.list.textData&&(that.textData = udata.data.list.textData)
                        !!udata.data.list.imgData&&(that.imgData = udata.data.list.imgData)
                        !!udata.data.list.linkData&&(that.linkData = udata.data.list.linkData)
                        !!udata.data.list.cardData&&(that.cardData = udata.data.list.cardData)
                        !!udata.data.list.programData&&(that.programData = udata.data.list.programData)
                        !!udata.data.list.text_imgData&&(that.text_imgData = udata.data.list.text_imgData)
                        !!udata.data.list.videoData&&(that.videoData= udata.data.list.videoData)
                        !!udata.data.list.fileData&&(that.fileData= udata.data.list.fileData)
//						that.textData = !!udata.data.list.textData?udata.data.list.textData:[];
//						that.imgData = !!udata.data.list.imgData?udata.data.list.imgData:[];
//						that.linkData = !!udata.data.list.linkData?udata.data.list.linkData:[];
//						that.cardData = !!udata.data.list.cardData?udata.data.list.cardData:[];
//						that.programData = !!udata.data.list.programData?udata.data.list.programData:[];
//						that.text_imgData = !!udata.data.list.text_imgData?udata.data.list.text_imgData:[];
						that.materialDataSelect = that.materialDataSelect.concat(that.textData,that.imgData,that.linkData,that.cardData,that.programData,that.text_imgData,that.fileData,that.videoData)
                        that.materialDataSelect = comConf.arrayUnique(that.materialDataSelect,'id')
						for(let i = 0; i < that.textData.length; i++) {
							that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
						}
						
						for(let j = 0; j < that.text_imgData.length; j++) {
							that.text_imgData[j].content = emoji.stringToHtml(that.text_imgData[j].content);
						}

					}
				});
			},
			getUserList(){//获取用户标签
				let that = this;
				this.$axios({
					method: 'GET',
					url: '/index.php?r=uc/customer/list',
					params: {
                        'assistant_id':that.selectWxlist,
						'department_id': that.queryForm.department_id,
						'key':that.searchKey_friend,                                                    
						'p': that.user_pagination.current,
						'n': that.user_pagination.pageSize,
						'type':1,
						'pushType':this.pushType,
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.user_pagination.total = parseInt(udata.data.count); //数据总条数
                        that.friendsId = udata.data.list;
                        that.userList = that.userList.concat(that.friendsId) 
                        that.userListAll = [];
                        let temp = {};  
                        let result = [];  
                        that.userList.map(function (item, index) {
                            if(!temp[item.id]){
                                result.push(item);
                                temp[item.id] = true;
                            }
                        });
                        that.userListAll = result;
					}
				});
				
			},
			refreshGroup() {//请求标签
                let that = this;
                //获取所有标签接口
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/assistant-customer-label',
					data:{
					    'assistant_id':that.selectWxlist,
//						'department_id': that.queryForm.department_id,
						'searchKey':that.searchKey_user,
//                        'p':that.label_pagination.current,			//页码
//                        'n':that.label_pagination.pageSize,			//每页条数
//						'all':'1'
					}
				}).then(function(d) {
					// 响应成功回调
                    var udata = d.data;
					if(udata.status == 1) {
                        that.label_pagination.total = parseInt(udata.data.total); //数据总条数
                        that.allUserLabel =  udata.data.list;
//                        that.userLabel = udata.data.list;
                        that.select_user_onShowSizeChange(1)
					}
				});
			},
			getLabelTotal() {//请求用户总数
				let that = this;
				let lable = [];
				let user = []
				let user_id = []
                that.select_label.forEach(el=>{
                    lable.push(el.id)
				})
                that.select_user.forEach(el=>{
                    user.push(el.friend_user_name)
                    user_id.push(el.id)
                })
                that.queryForm.friendsId = user_id
                that.queryForm.userLabel = lable
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/label-friends-num',
					data: Object.assign({},{
                        'assistant_id':that.selectWxlist,
						'department_id': that.queryForm.department_id,
						'userLabel':lable,
						'friendsId':user,
//						'friendsChecked':that.queryForm.friendsChecked,
						'visble_type':that.queryForm.visble_type, //10 公开 20 部分可见 30 不给谁看
//						'userChecked':that.queryForm.userChecked
						'pushType':that.pushType
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.userTotal = udata.data;
					}
				});
			},
			resendFn(resend_id){//重新发送
					this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/send-restart',
					data: {
						'id':resend_id
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						console.log(udata.data)
					}
				});
			},
            imgExists(e) {
                console.log('imgLoadError')
                let imgUrl = this.$store.state.user.user.default_url;
                let img = new Image();
                //判断图片大小是否大于0 或者 图片高度与宽度都大于0
                img.onload = function() {
                    if(img.filesize>0||(img.width>0&&img.height>0)){
                        e.target&&(e.target.src = imgUrl);
                        img = null
                    }
                }
                img.src=imgUrl;
            },
            checkIsRouter() {
			    let that = this
				let flag1 =false
                this.form.validateFields((err, fieldsValue) => {
                    let flag =false
                    that.sendMsgContent.forEach(el=>{
                        if(el.type==1&&el.content!='') {
                            flag = true
                        }
                        if(el.type==2&&el.materialItem.length!=0) {
                            flag = true
                        }
                    })
                    if(flag||that.timeShow.length!=0||(!!fieldsValue.friendsId&&fieldsValue.friendsId.length!=0)||(!!fieldsValue.userLabel&&fieldsValue.userLabel.length!=0)) {
                        flag1 = true
                    }else {
                        flag1 = false
					}
				})
				return flag1
			},
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
//                this.selectDepartment  = [{label:this.departmentList[0].title,value:this.departmentList[0].key}]
//                this.queryForm.department_id = [this.departmentList[0].key]
                this.selectDepartment  = [{label:this.$store.state.user.user.department.name,value:this.$store.state.user.user.department.id}]
                this.queryForm.department_id = [this.$store.state.user.user.department.id]
                this.getWxList()
            },
            listToTree(list,val) {
//              将部门列表转换为tree所用数据
                let array = []
                list.forEach((el,idx)=>{
                    if(el.children && el.children.length > 0) {
                        el.children =this.listToTree(el.children,idx)
                    }
                    array.push({title:el.name,key:el.id,value:el.id,children:el.children})
                })
                return array
            },
            onSelect(selectedKeys, info) {
//                this.queryForm.department_id = selectedKeys
            },
            wxListOnChange(value, label, extra) {
                console.log(value)
				this.selectWxlist = value
				this.filterUser()
                this.getLabelTotal();
			},
			filterUser() {
                let robotUsername = []
                this.wxList.forEach(el=>{
                    this.selectWxlist.forEach(item=>{
                        if(el.assistant_id==item) {
                        	robotUsername.push(el.username)
						}
					})
				})
				if(robotUsername.length==0) {
                    this.select_user = []
                    this.modalSelectedRowKeys1 = []
				}else {
					let selectUserArray =[]
					let modalSelectedRowArray = []
                    this.select_user.forEach(el=>{
                        let flag = false
                        robotUsername.forEach(item=>{
                            if(el.robot_username == item) {
								flag = true
							}
						})
						flag&&(selectUserArray.push(el))
					})
                    this.modalSelectedRowKeys1.forEach(el=>{
                        let flag1 = false
                        selectUserArray.forEach(item=>{
                            if(el.id == item) {
                                flag1 = true
                            }
                        })
                        flag1&&(modalSelectedRowArray.push(el))
                    })
                    this.select_user = selectUserArray
                    this.modalSelectedRowKeys1 = modalSelectedRowArray
				}
			},
            getWxList() {
//                this.queryForm.department_id
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/department-assistant-list',
                    data:{
                        department_id:this.queryForm.department_id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
						this.wxList = udata.data
                        this.selectWxlist = []
                        this.wxList.forEach(el=>{
                            if(el.status==10) {
                                this.selectWxlist.push(el.assistant_id)
							}
						})
                        this.getLabelTotal();
                    }
                });
			},
            onChange(value, label, extra) {
                this.selectDepartment = value
                this.queryForm.department_id = []
				this.selectDepartment.forEach(el=>{
                    this.queryForm.department_id.push(el.value)
				})
				this.userAndLabelFilter()
                if(value.length==0) {
//                    this.selectDepartment  = [{label:this.departmentList[0].title,value:this.departmentList[0].key}]
//                    this.queryForm.department_id = [this.departmentList[0].key]
                    this.selectDepartment  = [{label:this.$store.state.user.user.department.name,value:this.$store.state.user.user.department.id}]
                    this.queryForm.department_id = [this.$store.state.user.user.department.id]
                }
                this.getWxList()
			},
			userAndLabelFilter() {
                let data1 = JSON.parse(JSON.stringify(this.userLabelList))
                let data2 =JSON.parse(JSON.stringify(this.select_user_list))
				let index1 = 0
				let index2 = 0
                data1.forEach((el,index)=>{
                    let flag = false
                    this.queryForm.department_id.forEach(item=>{
                        if(el.department_id==item) {
                            flag  = true
						}
					})
					if(!flag) {
                        this.clear_label_user(index-index1)
                        index1=index1+1
					}
				})
                data2.forEach((el,index)=>{
                    let flag1 = false
                    this.queryForm.department_id.forEach(item=>{
                        if(el.department_id==item) {
                            flag1  = true
                        }
                    })
                    if(!flag1) {
                        this.clear_user(index-index2)
                        index2=index2+1
                    }
                })
			},
            msgIntervalChange() {
                if(this.queryForm.msgInterval2<this.queryForm.msgInterval1) {
                    this.queryForm.msgInterval2 = this.queryForm.msgInterval1
                }
			},
            disabledDate(current) {
				return current <  moment().startOf('day')
			},
			getDisabledHours(current){
				if(this.timeFlag){
					let hours = this.newArray(0, 23);
					hours.splice(new Date().getHours(), hours.length);
					return hours; //禁止选择的小时
				}
			},
			getDisabledHoursa(){
				if(this.queryForm.overdue_time.substring(0,10) === moment().format('YYYY/MM/DD')) {
                    return {
                        disabledHours: () => this.newArray(0,new Date().getHours()),
                        disabledMinutes: () => this.queryForm.overdue_time.substring(11,13) ==(new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours())? this.newArray(0,new Date().getMinutes()):[],
                        disabledSeconds: () => [],
                    }
				}else {
                    return {
                        disabledHours: () => [],
                        disabledMinutes: () => [],
                        disabledSeconds: () => [],
                    }
				}

            },
            getDisabledPushHoursa(){
				if( this.queryForm.pushData.substring(0,10) === moment().format('YYYY/MM/DD')){
					return {
						disabledHours: () => this.newArray(0,new Date().getHours()),
						disabledMinutes: () => this.queryForm.pushData.substring(11,13) ==(new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours())? this.newArray(0,new Date().getMinutes()):[],
						disabledSeconds: () => [],
					}
				}else{
					return {
						disabledHours: () => [],
						disabledMinutes: () => [],
						disabledSeconds: () => [],
					}
				}
            },
			disabledMinutes(current){
				return this.timeFlag&&this.minuteFlag[this.timePicker_index] ? this.newArray(0,new Date().getMinutes()+2):'';//禁止选择的分钟
			},
			newArray(start, end) {
				let result = [];
				for (let i = start; i < end; i++) {
					result.push(i);
				}
				return result;
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
			this.form.getFieldDecorator('date_keys', {
				initialValue: [++id]
			});
			this.form.getFieldDecorator('time_keys', {
				initialValue: [++id]
			});
//			this.form.getFieldDecorator('textarea_val', {
//				initialValue: [++id]
//			});
//			this.form.getFieldDecorator('friendsId', {
//				initialValue: []
//			});
//			this.form.getFieldDecorator('userLabel', {
//				initialValue: []
//			});
		},
		created() {
			if(!!this.$route.query.resend_id){
				this.resendFn(this.$route.query.resend_id);//重新发送
			}
			this.treeList()
		},
        beforeRouteLeave: function(to, from , next){
            let _this =this
            next(false)
			if(!this.isRouter&&this.checkIsRouter()) {
                this.$confirm({
                    title:'提示',
                    content:'此推送未进行保存，进行其他操作会导致该推送内容被清空，是否继续?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk:function () {
                        _this.isRouter = false
                        next()
                    }
                })
			} else {
                _this.isRouter = false
                next()
			}
        }
	}
</script>

<style lang="less">
	.creatPush{
        .ant-form-item-label{
            text-align:left;
        }
    }
	.tag{
		cursor: pointer;
	}
	.modal_tabs {
		margin-top: -35px;
		.ant-tabs-content {
			height: 360px;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.ant-list-grid .ant-list-item {
			margin-bottom: 0;
		}
		.ant-card-cover {
			height: 100%;
			position: static;
		}

	}
	
	.modal_tabs .ant-radio {
		float: right;
	}
	
	.background-color {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
	}
	
	.check_ck .ant-radio {
		position: absolute;
		top: 0;
		z-index: 10;
		width: 97px;
		display: inline-block;
		height: 36px;
		opacity: 0;
	}
	.ant-card-cover img {
	    // width: 50%;
	    height: 100%;
	}
	.ant-radio-wrapper-checked .link_box  .ant-card-meta-detail div{
		color: #fff !important;
	}
	.checkbox_content .ant-checkbox,.checkbox_content .ant-radio{
		opacity: 0 !important;
	}
	.ant-checkbox-wrapper-checked  {
		.img_box,.link_box,.card_box {
            // background: #5AA9CD !important;
            border:1px solid #5AA9CD!important;
			color: #222 !important;
		}
		.text {
			>div {
				border-color: #5AA9CD!important;
			}
		}
	}
	.material_content {
		.ant-form-item-children {
			position: static;
		}
	}
	.push-link-style,.push-friend {
		.ant-card-body {
			padding: 10px;
		}
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
</style>
<style scoped lang="less">
    .page-style{
         height: calc(~"100vh - 148px");
         overflow-y: auto;
         margin-top:0;
         padding:13px 0;
    }
    .row{
        border-bottom:1px solid #ededed;
        padding: 0 0 10px 0;
        .tit{
            margin-top:6px;
            font-size:14px;
            font-weight:800;
        }
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
    .publicCard{
		border:1px solid #D9D9D9;
		border-radius:5px;
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
		padding:6px 10px 0;
		border:1px solid #d9d9d9;
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
        .pagination_box{
			text-align: right;
		    margin-bottom:20px;
		}
	@media only screen and (max-width: 1200px){
		.sel_user{
			text-align: left !important;
			display: block !important;
			margin-top: 20px;
		}
	}
	
	@media  (min-width: 320px){
		.pagination_box{
			text-align: left;
			// margin-top: 20px;
		}
	}
	@media  (min-width: 1200px){
		.pagination_box{
			text-align: right;
			margin-top: 0;
		}
	}

    .titleStyle{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
	.user_box{
		border: 1px solid #bbb;
		padding: 10px;
		border-radius:5px ;
		.select_user{
			.user_avatar{
				/*max-height: 30%;*/
				/*max-width: 30%;*/
				height: 50px;
				width: 50px;
				border-radius:50% ;
				margin-right: 5%;
				display: inline-block;
				vertical-align: middle;
				img{
					border-radius: 10px;
					width: 100%;
					height: 100%;
				}
			}
			.user_name{
				max-width: 35%;
				color: #000000;
	    		font-size: 14px;
				display: inline-block;
				vertical-align: middle;
				overflow-x: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				white-space: nowrap;
			}
			.select_user_name{
				color: #000000;
	    		font-size: 14px;
	    		text-align: center;
			}
			.num{
				text-align: center;
				margin-top: 5px;
				color: #000000;
	    		font-size: 14px;
			}
		} 
	}
	.ant-radio-wrapper-checked{
		.div-edit,.ant-card,.bottom_box{
			background: #5AA9CD !important;
			color: #fff !important;
			border:1px solid #5AA9CD  !important;
		}
	}

	.ant-checkbox-wrapper-checked{
     	.labelColoe_1{
     	    background: #393939 !important;
     	    border:1px solid #393939  !important;
     	}
     	.labelColoe_2{
			background: #5bbfea !important;
			border:1px solid #5bbfea  !important;
     	}
     	.labelColoe_3{
     	    background: #5bca89 !important;
			border:1px solid #5bca89  !important;
     	}
     	.labelColoe_4{
     	    background: #7666cc !important;
			border:1px solid #7666cc  !important;
     	}
     	.labelColoe_5{
     	    background: #ffb802 !important;
			border:1px solid #ffb802  !important;
     	}
     	.labelColoe_6{
     	    background: #ff9a47 !important;
			border:1px solid #ff9a47  !important;
     	}
     	.labelColoe_7{
     	    background: #f91a1a !important;
			border:1px solid #f91a1a  !important;
     	}
	 	.user_active{
			background: #5AA9CD;
            .user_name{
				color: #fff !important;
			}
			.select_user_name{
				color: #fff !important;
			}
			.num{
				color: #fff !important;
			}
         }

	}
	.sel_user .info{
		padding: 4px 15px 4px 37px;
	}
	.sel_user .info .circle_icon{
		top: 7px;
	}
	.login-form {
		// margin-bottom: 160px;
	}
	
	.clearFloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.clearFloat {
		zoom: 1;
		height: 190px;
	}
	
	.fr {
		float: right;
	}
	
	.fl {
		float: left;
	}
	
	.mag_push_title {
		border-bottom: 1px solid #EDEDED;
		margin: 0 0 20px 0;
		padding: 17px 38px;
		font-size: 16px;
	}
	
	.col-margin {
		/*margin: 0 0 0 38px;*/
	}
	.push-icon{
        padding:0 4px;
        background: #fafafa;
        border: 1px solid #e8e8e8;
        margin-right: 8px;
        color: #bbb;
        border-radius: 2px;
        white-space: nowrap;
    }
    .push-time{
        background: #E6F7FF;
		border: 1px solid #91D5FF;
		color: #101010;
		font-size: 12px;
		padding: 6px 0 6px 6px;
		border-radius: 4px;
		margin: 6px 0px 10px 0px;
		max-width: 80%;
		overflow-x:hidden ;
    }
	.col-margin .time {
		position: relative;
		background: #E6F7FF;
		border: 1px solid #91D5FF;
		color: #101010;
		font-size: 14px;
		padding: 4px 6px;
		display: inline-block;
		border-radius: 4px;
		margin: 0px 0px 20px 0px;
		max-width: 50%;
		overflow-x:hidden ;
		padding-right: 40px;
	}
	
	.more{
		position: absolute;
		top: 0;
		right: 10px;
		width: 20px;
		height: 20px;
		cursor: pointer;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.ant-alert {
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5;
		color: rgba(0, 0, 0, .65);
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		position: relative;
		padding: 4px 15px 4px 37px;
		border-radius: 4px;
		border: 1px solid #91d5ff;
		background-color: #e6f7ff;
		display: inline-block;
	}
	
	.circle_icon {
		top: 6.5px;
		left: 16px;
		position: absolute;
		svg{
			font-size: 16px;
		}
	}
	
	.ant-info span {
		color: #5AA9CD;
		margin: 0 2px;
	}
	
	.ant-info .pointer {
		cursor: pointer;
		margin-left: 20px;
	}
	.dynamic-delete-button svg{
		font-size: 18px;
	}
	.anticon.close svg {
		font-size: 18px;
		margin-left: 4px;
	}
	
	.modal_tabs {
		.text {
            // min-height: 120px;
          max-height:120px;
          display:block;
          overflow: hidden;
         text-overflow: ellipsis;
		}
		.div-edit {
			border: 1px solid #D9D9D9;
			height: 120px;
			padding: 10px;
			overflow-y: initial;
			word-break: break-all;
			word-wrap: break-word;
			white-space: pre-wrap;
			max-width: initial;
            margin: 0;
            display:block;
            overflow: hidden;
            text-overflow: ellipsis;
			border-radius: 5px;
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
			    margin: 0;
			}
			.ant-card-meta-detail{
				margin-top: 16%;
			}
		}
		.bottom_box {
			padding: 7px 0;
			background: #fafafa;
			font-size: 12px;
			color: #5f5f5f;
			padding-left: 24px;
		}
	}
	
	
.fixed_success{
	/*position: fixed;*/
	/*top: 65px;*/
	/*width: 100%;*/
	/*height: 120%;*/
	background: #fff;
	z-index: 10;
	position: absolute;
	left: 0;
	right:0;
	bottom:0;
	top:0;
	.center_box{
		width: 360px;
		position: absolute;
		/*top: 50%;*/
		left: 50%;
/*		margin:-300px 0 0 -340px;*/
		/*transform: translate(-50%,-50%);*/
		transform: translateX(-50%);
		margin-top: 150px;
		min-height: 400px;
		text-align: center;
	}
	.icon{
		color: green;
		margin-bottom: 16px;
		svg{
			font-size: 72px;
		}
	}
	.decs{
		font-size: 24px;
	    color: rgba(0,0,0,.85);
	    font-weight: 500;
	    line-height: 32px;
	    margin-bottom: 20px;
	}
	.text{
		padding: 20px;
		background: #f0f2f5;
		text-align: left;
	}
	.btn_box{
		margin-top: 40px;
		padding: 0 90px;
	}
}

</style>