<style lang="less" >

    .search-input {
        /*background: rgb(230,229,229);*/
        background: #ededed;
        height: 60px;
        line-height: 60px;
        padding: 0 10px;
        .anticon-close-circle {
            cursor: pointer;
            color: #ccc;
            transition: color 0.3s;
        }
        .anticon-search {
            svg {
                font-size: 15px;
                color: #999999;
            }
        }
        .ant-input-affix-wrapper {
            width: calc(~"100% - 74px");
            display: inline-block;
            .ant-input {
                outline: none;
                box-shadow: none;
                border: none;
                background: rgb(230,229,229);
                padding-left: 50px;
            }
            .ant-input:focus {
                outline: none;
                box-shadow: none;
                border: none;
                /*background: rgb(230,229,229);*/
                background: #fff;
            }
        }
        .search-btn {
            width: 50px;
            display: inline-block;
            color:#656565 ; //rgb(73,101,130)
            text-align: center;
            font-size: 16px;
            font-family: '微软雅黑';

            cursor: pointer;
        }

    }
    .search-input-right{
         background: #fff;
        height: 42px;
        line-height: 42px;
        padding: 0 10px;
        .anticon-close-circle {
            cursor: pointer;
            color: #ccc;
            transition: color 0.3s;
        }
        .anticon-search {
            svg {
                font-size: 15px;
                color: #999999;
            }
        }
        .ant-input-affix-wrapper {
            // width: calc(~"100% - 34px");
            width:calc(100% - (-2px));
            display: inline-block;
            .ant-input {
                outline: none;
                box-shadow: none;
                border: none;
                background: rgb(243, 243, 243);
                padding-left: 50px;
            }
            .ant-input:focus {
                outline: none;
                box-shadow: none;
                border: none;
                /*background: rgb(230,229,229);*/
                background: #fff;
                box-shadow: 0 0 3px rgba(64, 122, 255, .5);
            }
        }
        .search-btn {
            width: 50px;
            display: inline-block;
            color:#656565 ; //rgb(73,101,130)
            text-align: center;
            font-size: 16px;
            font-family: '微软雅黑';

            cursor: pointer;
        }
    }
    .contact-list,.contact-list-body {
        background: #ededed;// rgb(230,229,229);
        height: calc(~"100% - 92px");
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar-track-piece{width:0px;height: 0px;background-color:#e6e5e5 ;  }
        &::-webkit-scrollbar{width:0px;height:0px ; }
        &::-webkit-scrollbar-thumb{height:30px;width: 30px;background:#cdcdcd;   cursor:pointer;}
        &::-webkit-scrollbar-thumb:hover{background:#cdcdcd ; cursor:pointer}
        >div {
            // overflow-x: hidden;
        }
        &:hover {
            &::-webkit-scrollbar-track-piece{width:6px;height: 6px;}
            &::-webkit-scrollbar{width:6px;height:6px ; }
            >div {
                overflow-x: hidden;
                width: calc(~"100% + 6px");
            }
        }
    }
    .contact-list-left{
        background: #fff;
        width:100px;
        flex:0 0 100px;
        height: calc(~"100% - 2px");
        .contact-list-left-title{
            background: #5AA9CD;
            color: #ffffff;
            height:60px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            padding: 0 10px;
            line-height: 60px;
            position: relative;
            .contact-list-left-title-name {
                width: 48px;
                vertical-align: middle;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                word-break: break-all;
                display: -webkit-box;
                position: absolute;
                left: 35px;
                top:50%;
                transform: translateY(-50%);
                line-height: initial;
                font-size: 12px;
            }
            .contact-list-left-title-icon {
                position: absolute;
                right: 2px;
                top:50%;
                transform: translateY(-50%);
            }
            .icon-left {
                display: none;
            }
            &:hover {
                background: #2692C1;
            }
            .more-manager {
                display: none;
                width: 500px;
                position: absolute;
                left: 100px;
                top:0;
                z-index: 100;
                font-size: 0;
                .more-manager-item {
                    display: inline-block;
                    background: #5AA9CD;
                    color: #ffffff;
                    height:60px;
                    cursor: pointer;
                    font-size: 12px;
                    position: relative;
                    padding: 0 10px;
                    line-height: 60px;
                    width:100px;
                    vertical-align:bottom;
                    &:hover {
                        background: #2692C1;
                    }
                }
                .more-manager-item-hidden {
                    display: none;
                }
            }
            &:hover {
                .icon-right {
                    display: none;
                }
                .icon-left {
                    display: inline-block;
                }
                .more-manager {
                    display: block;
                }
            }
        }
        .contact-list-body{
            height: calc(~"100% - 70px");
            background:#fff;
            // box-shadow:0 20px 16px rgba(0,0,0,.1);
        }
    }
    .chat-header {
        background: #F8F8F8;
        height: 60px;
        line-height: 60px;
        padding: 0 94px 0 10px;
        border-bottom: 1px solid #F0F2F5;
        text-align: center;
        color: rgb(16,16,16);
        position: relative;
        .jump-btn {
            position: absolute;
            right: 20px;
            bottom: -50px;
            z-index: 10;
        }
        .circle {
            display: inline-block;
            background: #535354;
            width: 4px;
            height: 4px;
            border-radius: 50%;
        }
        .set-hint {
            position: absolute;
            right: 6px;
            top: 60px;
            line-height: initial;
            background: #ffffff;
            text-align:left;
            border-radius: 4px;
            cursor: pointer;
            z-index: 10;
            div {
                color: #7B7B7B;
                padding: 6px 10px;
                img {
                    width: 20px;
                    height: 20px;
                    vertical-align: bottom;
                    display: inline-block;
                }
            }
        }
    }
    .chat-content {
        height: calc(~"100% - 260px");
        padding: 10px 20px;
        overflow-x: hidden;
        overflow-y: auto;
        background: #F8F8F8;
        &::-webkit-scrollbar-track-piece{width:6px;height: 6px;background-color:#e6e5e5 ;  }

        &::-webkit-scrollbar{width:6px;height:6px ; }

        &::-webkit-scrollbar-thumb{height:30px;width: 30px;background:#cdcdcd;   cursor:pointer;}

        &::-webkit-scrollbar-thumb:hover{background:#cdcdcd ; cursor:pointer}
    }
    .bg-f {
        background: #ffffff;
    }
    .input-content {
        height: 200px;
        padding: 10px;
        background: #ffffff;
        &:hover {
            background: #ffffff;
        }
        .tools {
            display: flex;
            >div {
                padding: 0 10px;
                cursor: pointer;
                .anticon svg {
                    font-size: 20px;
                    color: #a8a7a7;
                }
                #emoji {
                    position: absolute;
                    top: -160px;
                    width:390px;
                    height: 155px;
                    left:0;
                    border: 1px solid #cccccc;
                    padding: 5px;
                    z-index: 10;
                    line-height: 1;
                    background: #ffffff;
                    &::after {
                        margin-top: -1px;
                        border: 7px solid transparent;
                        border-top-color: #fff;
                        content: "";
                        position: absolute;
                        left: 16px;
                        top: 100%;
                        margin-left: -5px;
                    }
                }
            }
        }
        .input-content-area {
            word-wrap: break-word;
            white-space : normal;
            position: relative;
            .send-action {
                text-align: right;
                margin-top: 5px;
                .desc {
                    color: #888;
                    font-size: 14px;
                    margin-left: 10px;
                    margin-right: 7px;

                }
                .btn_send {
                    // background: #c2c0bf;
                    border-color: #c2c0bf;
                    padding: 0 25px;

                    &:hover {
                        background: #5AA9CD;
                        color:#fff;
                        border-color: #5AA9CD;
                    }
                }
                .bg-b {
                    background: #5AA9CD;
                    border-color: #5AA9CD;
                    color:#fff;
                }
            }

        }
    }
    // .right-header {
    //     background: #ffffff;
    //     height: 60px;
    //     padding: 0 10px;
    //     /*border-bottom: 1px solid #c2c2c2;*/
    //     text-align: center;
    //     font-size: 16px;
    //     .ant-tabs-bar {
    //         margin: 0;
    //         height: 60px;
    //         border-bottom-color: #c2c2c2;
    //         .ant-tabs-tab {
    //             margin: 0;
    //             line-height: 36px;
    //         }
    //     }

    // }
    .ant-tabs .ant-tabs-right-bar{
        border-left:0;
        float:initial;
    }
    .ant-tabs-nav-wrap{
        margin-left:0;
    }
    .ant-tabs-nav{
        padding-top:4px;
    }
    .right-nav{
        background:#001529;
        .right_icon{
            margin:20px 0 30px;
            text-align: center;
            cursor: pointer;
            border-bottom:1px dashed #ccc;
            padding-bottom:16px;
            color:#fff;
        }

        .ant-tabs-tab{
            box-shadow: 0 0 10px rgba(64, 122, 255, .5);
            margin: 0 10px 10px !important;
            width: 58px;
            height: 58px;
            padding:0 !important;
            border-radius: 58px;
            text-align: center;
            line-height: 58px;
            font-size:12px;
            color:#474747;
            word-wrap:break-word !important;
            word-break:break-all;
            overflow: hidden;
        }
        .ant-tabs-tab-active{
            background:#5AA9CD;
            color:#fff;
        }

    }
    .right-content {
         height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: #ffffff;
        &::-webkit-scrollbar-track-piece{width:6px;height: 6px;background-color:#e6e5e5 ;  }
        &::-webkit-scrollbar{width:6px;height:6px ; }
        .contact-info {
            .info {
                padding: 10px;
                .special-input1 {
                    border-bottom: 1px solid #d9d9d9;
                }
                .special-input {
                    border: none;
                    /*border-bottom: 1px solid #d9d9d9;*/
                    border-radius: 0;
                    width: 220px;
                    padding: 0;
                    height: auto;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                }
                .ant-form-item {
                    margin-bottom: 0;
                    .btn-save {
                        background: #c2c0bf;
                        border-color: #c2c0bf;
                        padding: 0 25px;
                        &:hover {
                            background: #5AA9CD;
                            border-color: #5AA9CD;
                        }
                    }
                }
                .room-qrcode {
                    position: relative;
                    .room-qrcode-refresh {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        background: rgba(0,0,0,0.4);
                        z-index: 10;

                    }
                }
            }
            .labels {
                padding: 10px;
                color: rgb(16,16,16);
                .ant-tag:hover {
                    background: #5AA9CD;
                    color: #ffffff;
                    opacity: 1;
                }
            }
        }
        .material-info {
            // margin-right: 10px;
            padding: 15px;
            background: #ffffff;
            min-height: 100%;
            .anticon-close-circle {
                cursor: pointer;
                color: #ccc;
                transition: color 0.3s;
            }
            .anticon-search {
                cursor: pointer;
                svg {
                    font-size: 15px;
                }
            }
            .ant-input-affix-wrapper {
                display: inline-block;
                .ant-input {
                    outline: none;
                    box-shadow: none;
                    border: none;
                    background: #f4f4f4;
                    padding-left: 50px;
                }
                .ant-input:focus {
                    outline: none;
                    box-shadow: none;
                    border: none;
                    background: #f4f4f4;
                }
            }
            .material-list {
                >div {
                    background: #F4F4F4;
                    padding: 6px;
                    margin-top: 15px;
                    border-radius: 4px;
                }
            }
        }
        .chat-info {
            background: #ffffff;
            padding: 10px;
            min-height: 100%;
        }
        .chat-info-friend{
            background: #e8e8e8;
            min-height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            .firendsList{
                background:#fff;
                padding:10px;
                width:100%;
                 margin-bottom:10px;
                .atvalHead{
                    width:50px;
                    height:50px;
                    float:left;

                }
                .frliendsWarp{

                    background:#fff;
                }
                .head{
                    float:right;
                    width: calc(~"100% - 60px");
                     .head-title{
                        .head-nickName{
                            margin-bottom:0;
                            font-weight: 800;
                            height:26px;
                            font-family: '微软雅黑';
                            color:#5AA9CD;
                            .friend{
                                cursor: pointer;
                            }
                            span:nth-child(1){
                                float:left;
                            }
                            span:nth-child(2){
                                float:right;
                                color:rgb(146, 146, 146);
                                cursor:pointer;
                            }
                        }
                        .head-min{
                            max-height:48px;
                            margin-bottom:12px;
                            line-height: 24px;
                            // -webkit-line-clamp:2;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            overflow:hidden;
                            // text-overflow: ellipsis!important;
                            span{
                                cursor:pointer;
                                color:#5AA9CD;
                                font-weight: 800;
                            }
                        }
                        .head-min-b{
                            margin-bottom:12px;
                             span{
                                cursor:pointer;
                                color:#5AA9CD;
                                font-weight: 800;
                            }
                        }
                    }
                    .imgWrap{
                        width:248px;
                        .imgList{
                            width:76px;
                            height:76px;
                            margin-right:6px;
                            margin-bottom:6px;

                            background-size: contain;
                            float:left;
                        }
                    }
                    .imgWrap::after{
                            display:block;
                            content:'';
                            height:0;
                            visibility: hidden;
                            clear:both;
                    }
                    .head-footer{
                      padding-bottom:24px;
                      padding-right:6px;
                        span:nth-child(1){
                            float:left;
                            font-size:12px;
                            color:#535354;
                        }
                        span:nth-child(2){
                            float:right;
                            color:#5AA9CD;
                            cursor:pointer;
                            font-size:12px;
                        }
                    }
                }
                .friendsHeart{
                    padding:10px;
                    background:#f0f0f0;
                    position:relative;
                    clear:both;
                    .choseHeart-b{
                        max-height:90px;
                        overflow: hidden;
                    }
                    .choseHeart{
                        .heartAvtal{
                            color:#5AA9CD;
                            width:30px;
                            height:30px;
                            display:inline-block;
                            margin-right:2px;
                            margin-bottom:6px;
                            border-radius:4px;
                        }
                    }
                    .leaveMsg-b{
                        max-height:200px;
                        overflow:hidden;
                    }
                    .leaveMsg{
                        margin-top:10px;

                        .talk{
                            width:18px;
                            margin-right:10px;
                            float:left;
                        }
                        .talkMsgList{
                            float:left;
                            .talkHead{
                                width:30px;
                                height: 30px;
                                float:left;
                                margin-right:10px;
                            }
                            .personTalklist{
                                float:left;
                                width:220px;
                                .firstMsg{
                                    cursor: pointer;
                                    margin-bottom:0;
                                    margin-top:-4px;
                                    span:nth-child(1){
                                        float:left;
                                        color:#5AA9CD;
                                        // font-weight: bold;
                                    }
                                    span:nth-child(2){
                                        float:right;
                                        font-size:12px;
                                        color:rgb(141, 141, 141);
                                    }
                                }
                                .firstMsg:after{
                                    display:block;
                                        content:'';
                                        height:0;
                                        visibility: hidden;
                                        clear:both;
                                }
                                .replay{
                                    clear: both;
                                    font-size:12px;
                                }
                                .replyColor{
                                    color:#5AA9CD;
                                }
                            }

                        }
                    }
                    .leaveMsg::after{
                            display:block;
                            height:0;
                            clear:both;
                            content:'';
                            visibility: hidden;
                        }
                }
                .footer{
                    margin-top:10px;
                    clear:both;
                    position:relative;
                    height:50px;
                    .send{
                        background:#5AA9CD;
                        color:#fff;
                        position:absolute;
                        right:0;
                        top:2px;
                    }

                }
                && ::after{
                    display:block;
                    content:'';
                    height:0;
                    visibility: hidden;
                    clear:both;
                }
            }
        }
        .buy-info {
            background: #ffffff;
            padding: 10px;
            min-height: 100%;
            position: relative;
        }
    }
    .tag-modal {
        .ant-tag {
            margin-bottom: 5px;
        }
    }
    .drga{
        width:14px;
        height:40px;
        position:absolute;
        top:18px;
        right:-18px;
        z-index: 99;
        cursor: pointer;
    }
    .wp{
        position:relative;
        background: #ededed;
    }

    .contentRight{
        background:#fff;
        z-index:99;
        // position:absolute;
        // right:102px;
        /*border-left: 1px solid #dcdcdc;*/
        width: 335px;
        flex: 0 0 335px;
        height: 100%;
    }
    .badge{
        position: absolute;
        top: 4px;
        left:4px;
        display:block;
        box-shadow:0 0 6px rgba(0,0,0,.1);
        font-size:12px;
        height: 22px;
        width: 22px;
        border-radius: 22px;
        line-height: 22px;
        text-align: center;
        z-index:99;
        color:#fff;
    }
    .mangCust{
        position:relative;
        text-align:center;
        padding-top:12px;
        padding-bottom:12px;
        cursor:pointer;
    }
    .mangCust:hover{
        background:#ededed;
    }
    .mangCustActive{
        /*background:#ededed;*/
        background: #E8F7FF;
        border-left: 6px solid #5AA9CD;
        &>span {
            margin-left: -6px;
        }
        &>span.nickName {
            margin-left: -3px;
        }
    }
    .ant-badge-not-a-wrapper{
        vertical-align:none;
    }
    .nickName{
        font-size: 12px;
        text-align:center;
        /*position:absolute;*/
        /*top:54px;*/
        /*left:0;*/
        /*width:100%;*/
        /*white-space:nowrap;*/
        /*text-overflow:ellipsis;*/
        /*overflow:hidden;*/

        padding:0 4px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
    }
    .tabNavWarp{
        width:58px;
    }
    .tabNav{
        width:36px;
        height:36px;
        margin:0 auto 20px;
        border-radius:46px;
        padding:6px;
        line-height:18px;
        background:#fff;
        font-size:28px;
        color:rgb(122, 122, 122);
        text-align:center;
        cursor: pointer;
    }
    .sendBtn{
        text-align:right;
        padding-top: 3px;
    }
    .fastReply{

        height:24px;
        line-height:24px;
    }
    .quessionIcon{
        font-size:22px;
        vertical-align: middle;
        color:rgb(253, 188, 92);
    }
    .fastReply .questionTitle{
        padding-left: 6px;
        vertical-align: middle;
        color:#101010;
        font-size:14px;
        font-weight: 700;
    }
    .notFound{
        position:relative;
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    .stausPage-3{
        margin: 20px 90px;
        width: 120px;
        opacity: 0.3;
    }
    .stausPage-4{
        margin: 248px 94px;
        width: 136px;
        opacity: 0.3;
    }

    .stausPage-2{
        margin: 180px 90px;
        width: 120px;
        opacity: 0.3;
    }
    .stausPage-l{
        width:100px;
        margin:0 auto;
    }
    .tabNavActive{
        background:#108ee9;
    }
    .hidden-icon {
        display: none;
    }
    .fontSiz{
        font-size:18px;
    }
    .order-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .order-content-left {
            width: 350px;
            display: inline-block;
            color: #101010;
            .left-item {
                line-height: 50px;
                .item-title {
                    margin-right: 20px;
                }
            }
        }
        .order-content-right {
            width: 600px;
            display: inline-block;
            color: #101010;
            .left-item {
                line-height: 50px;
            }
        }
    }
    .tag-modal1 {
        margin-top:20px;
        .ant-tag:hover {
            background: #5AA9CD;
            color: #ffffff;
        }
        .ant-tag-checkable{
            border: 1px solid #d9d9d9;
            background: #fafafa;
        }
        .ant-tag-checkable-checked {
            background: #5AA9CD;
        }
    }
    .moadalVideo> .ant-modal-content{
        background:none;
        box-shadow: none;
    }
    .moadalVideo>.ant-modal-content>.ant-modal-close{
        position: absolute;
        top:12px;
        right:12px;
    }
    .clar{
        height:22px;
        line-height:22px;

    }
    .creatGpTitle{
        border-bottom:1px solid #f0f0f0;
        padding-bottom:10px;
    }
    .groupManage{
        .title{
            border-left: 5px solid #5AA9CD;
            padding-left: 10px;
            color: #4D4D4D;
            font-weight: 700;
        }
    }
    .creat-content{
        .title{
            border-left: 5px solid #5AA9CD;
            padding-left: 10px;
            color: #4D4D4D;
            font-weight: 700;
        }
        .crear-content-left{
            width:310px;
            border-right:1px solid #f0f0f0;
            float:left;
            padding-right:20px;
        }
        .crear-content-right{
            margin-top:10px;
            float:right;
            width:276px;
            // max-height:400px;
            // overflow-y: auto;
            // overflow-x: hidden;
        }
        .crear-content-bottom{
            border-top: 1px solid #f0f0f0;
            clear: both;
            height:24px;
            line-height:46px;
            text-align:right;
            padding-right:10px;
        }
        .chatUserList{
            max-height:318px;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .chosTitle{
            height:22px;
            line-height:22px;
            padding-left:10px;
            margin-bottom:10px;
        }
        .choseRightlist{
            cursor: pointer;
            height:40px;
            line-height:40px;
            width:100%;
            vertical-align: middle;
            padding:0 10px;
            box-sizing:border-box;
        }
        .chatUserListRight:after{
                display:block;
                content:'';
                height:0;
                visibility: hidden;
                clear:both;
        }
        .choseRightlist:hover{
            background:#f0f0f0;
        }
        .ant-checkbox-group{
            width:100%;
        }
        .ant-checkbox-wrapper{
            height:40px;
            line-height:40px;
            margin-left:0;
            width:100%;
            .ant-checkbox{
                margin-top:12px;
                padding-right:10px;
                float:right;

            }
            .ant-checkbox-inner{
                    width:16px;
                    height:16px;
                    border-radius: 16px;
            }
        }
        .ant-checkbox-wrapper:hover{
                background:#f0f0f0;
        }
        .group-inpt{
            width:94%;
            margin-left:6px;
        }
        &&::after{
            display:block;
            content:'';
            height:0;
            clear:both;
            visibility:hidden;
        }
    }
    .groupTitle{
        width:100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .listPerson{
        .addPerson{

        }
        .deletPerson{

        }
        .addPerson,.deletPerson,.listPerson-content{
            cursor:pointer;
            width:38px;
            height:60px;
            margin-left:12px;
            margin-bottom:10px;
            float:left;
            text-align:center;
            p{
                width:100%;
                font-size:12px;
                margin:0;
                padding:0;
                line-height:24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .square{
            width:30px;
            height:30px;
            font-size:36px;
            margin-right:6px;
            color:#acacac;
            }
            .imgUrI{
                width:38px;
                height:38px;
                border:1px solid #f0f0f0;
                box-shadow: 0 0 6px rgba(0,0,0,0.1);
                border-radius:5px;
                display:block;
                margin:0 auto;
            }
        }
        .more{
            clear:both;
            height:30px;
            line-height:30px;
            cursor:pointer;
            color:#ccc;
            text-align:center;
            .moreIcon{
                color:#ccc;
            }
        }
        &&::after{
            display:block;
            content:'';
            height:0;
            clear:both;
            visibility: hidden;
        }
    }
    .tab-search{
        width:100%;
        height:calc(~"100% - 60px");
        position:absolute;
        background:#f2f2f2;
        z-index:99;
        overflow-y:auto;
        overflow-x:hidden;
        .ant-tabs-nav{padding-top:0;}
        .ant-tabs-nav .ant-tabs-tab{
            margin: 0;
            background:#fff;
        }
        .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
                padding: 8px 18px;
        }
        .ant-tabs-bar{
            margin:0;
        }
        .searchNav{
            width:300px;
            color:rgb(151, 151, 151);
        }
        .clr::after{
            display:block;
            clear:both;
            height:0;
            content:'';
            visibility: hidden;
        }
        .searchAll{
            padding:0 0 4px 0;
            .title{
                width:100%;
                background:#dedede;
                padding-left:16px;
                height:30px;
                line-height:30px;
                color:#a2a0a0;
            }
            .searchAll-contentList{
                height:58px;
                line-height:58px;
                padding:0 10px;
                cursor:pointer;
                position:relative;
                img{
                    width:40px;
                    height:40px;
                    display:inline-block;
                    background:#fff;
                    margin-bottom:4px;
                    vertical-align: middle;
                    margin-right:6px;
                }
            }
            .searchAll-contentList:hover{
                background:#cacdd3;
            }
            .searchAll-content{
                height:58px;
                line-height:58px;
                padding:10px 10px 8px 10px;
                cursor:pointer;
                position:relative;
                img{
                    width:40px;
                    height:40px;
                    display:inline-block;
                    background:#fff;
                    margin-bottom:4px;
                    vertical-align: middle;
                    margin-right:6px;
                }
            }
            .searchAll-content:hover{
                    background:#cacdd3;
            }

            .getMor{
                cursor: pointer;
                color:#5AA9CD;
                padding-left:10px;
                // padding-bottom:4px;
                font-size:12px;
            }
        }
    }
    .actvIdx{
        background:#ccc;
    }
    .emj{
            position: absolute;
        left: -229px;
        width: 340px;
        z-index: 9999;
        background: #fff;
        top: -163px;
    }
    .textMsg{
        display: block;
        word-break: break-all;
    }
    .liveChat .ant-select-selection,.liveChat .ant-select-open,.liveChat .ant-select-selection,.liveChat .ant-select-focused{
        border:none;
        outline:none;
        box-shadow: none;

    }
    .cardModal .ant-radio-inner{
        width: 0;
        height: 0;
        border:none;
        background:none;
    }
    .cardModal .ant-radio-inner:after{
        background:none;
    }
    .cardImg{
        width:40px;
    }
    .warn{
            color:rgb(244, 67, 33);
    }
    .creatGroup{
        height:28px;
        line-height:28px;
        background:#ADADAD;
        color:#fff;
        padding:0 8px;
        position:relative;
        .creatGroup-icon{
            cursor:pointer;
            margin-left:2px;
        }
        .editInp{
            height:20px;
            line-height: 20px;
            background: none;
            width:80%;
            outline: none;
            border:none;
            border-radius:0;
            border-bottom:1px solid #818181;
             &:focus {
                        outline: none;
                        box-shadow: none;
                    }
        }
    }
    .getMore{
        width:70px;
        height:20px;
        line-height:20px;
        margin:10px auto;
        border-radius:10px;
        background:#5AA9CD;
        text-align:center;
        cursor: pointer;
        color:#fff;
        font-size:12px;

    }
    .forWard{
        width:100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0px;
        z-index: 99;
        background:#f0f0f0;
        display:flex;
        .forWardTitl{
            margin:10px 0 0 10px;

        }
        div{
            flex:1;
           div{
            width:60px;
            height:60px;
            line-height:68px;
            background:#fff;
            box-shadow: 0 0 10px rgba(105, 105, 105, 0.1);
            border-radius:100%;
            margin:50px auto 0;
            cursor: pointer;
            color:#5AA9CD;
            text-align:center;
            .forWardIcon{
                margin-top:4px;
                font-size:24px;
            }
            &:hover{
                background:#5AA9CD;
                box-shadow: 0 0 10px rgba(11, 140, 255,.5);
                color:#fff;
            }
           }
           p{
               text-align:center;
               padding:10px 0;
               cursor:pointer;
           }
            &:hover p{
                color:#5AA9CD;
            }
        }
    }
    /*用户分组相关*/
    .group-list {
        background: rgba(0, 21, 41, 0.55);
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        position: relative;
        .ant-dropdown-link {
            color: #ffffff;
            width: 100%;
            cursor: pointer;
            display: inline-block;
            .anticon-down {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .user-group-menu {
        background: #E6E5E5;
        color: #888888;
        padding: 0;
        .user-group-item {
            &:hover {
                background: #5AA9CD;
            }
        }
    }
    .order-bind-page .ant-radio-wrapper {
        margin-right: 0;
    }
</style>
<style lang="less" scoped>
.right{
        width:10px;
        height:40px;
        position:absolute;
        top:0;
        right:10px;
        cursor:pointer;
    }
</style>
<template>
    <div style="" ondragstart="return false">
        <a-upload name="file" style="z-index: 99;position: absolute;top:0;left:0;width: 100%;height: 100%;border:1px solid #ccc" action="/index.php?r=uc/user/upload"  v-if="isxflag||isxflagD"   :beforeUpload="beforeUpload"  :showUploadList="false" :headers="headers">
            <p style="width: 100%;height: 100%;position: absolute;top: 0;"  @dragleave="leave" ></p>
        </a-upload>
        <div style="display: flex;height: calc(100vh - 90px);position:relative;" id="liveChatContent" ref="liveChatContent"  @dragenter.capture="dragente" @dragover.capture="dragover" >
            <!--<div style="min-width: 300px;width: 20%">-->
            <div class="contact-list-left">
                <div class="contact-list-left-title">
                    <!--<a-icon type="user" style=""></a-icon>-->
                    <img src="../../assets/user-w.png"  style="width: 20px;height: 20px;position: relative;top: -1px">
                    <span class="contact-list-left-title-name">{{selectUser.user_name}}</span>
                    <a-icon class="contact-list-left-title-icon icon-right" type="right" v-if="$store.state.user.user.see_department_power&&liveChatManage.length>1"></a-icon>
                    <a-icon class="contact-list-left-title-icon icon-left" type="left" v-if="$store.state.user.user.see_department_power&&liveChatManage.length>1"></a-icon>
                    <a-badge dot :numberStyle="{padding:'0',boxShadow:'none',backgroundColor:'#FF6B6B'}" :count="selectUser.num" style="position: absolute;left: 6px;top: 20px;"/>
                    <a-badge :dot="isHasDot" v-if="$store.state.user.user.see_department_power&&liveChatManage.length>1" :numberStyle="{padding:'0',boxShadow:'none',backgroundColor:'#FF6B6B'}" style="position: absolute;right: 6px;top: 6px;"/>
                    <div class="more-manager" v-if="$store.state.user.user.see_department_power&&liveChatManage.length>1">
                        <div :class="['more-manager-item',selectUser.id==item.id?'more-manager-item-hidden':'']" v-for="item in liveChatManage" :key="item.id" @click="changeUser(item)">
                            <!--<a-icon type="user"></a-icon>-->
                            <img src="../../assets/user-w.png" style="width: 20px;height: 20px;position: relative;top: -1px">
                            <span class="contact-list-left-title-name">{{item.user_name}}</span>
                            <a-badge dot :numberStyle="{padding:'0',boxShadow:'none',backgroundColor:'#FF6B6B'}" :count="item.num" style="position: absolute;left: 6px;top: 20px;"/>
                        </div>
                    </div>
                </div>
                <div class="contact-list-body">
                    <div :class="['mangCust',item.username==selectWx.username?'mangCustActive':'']" v-for="(item,index) in wxList" :key="item.username" @click="getLiveList(item)">
                        <div style="position: relative">
                            <a-avatar :src="item.avatar_url" size="large" shape="square" icon="user"/>
                            <img v-if="item.wx_type=='10'" src="../../assets/personalWx.png" alt="" style="height: 15px;position: absolute;right: 5px;top: 50%;transform: translateY(-50%)">
                            <img v-if="item.wx_type=='20'" src="../../assets/companyWx.png" alt="" style="height: 15px;position: absolute;right: 5px;top: 50%;transform: translateY(-50%)">
                        </div>
                        <span class="nickName">
                            <a-tooltip placement="right" style="font-size: 12px" v-if="item.nickname.length>14">
                                <template slot="title">
                                    <span style="font-size: 12px">{{item.nickname}}</span>
                                </template>
                                {{item.nickname}}
                            </a-tooltip>
                            <span v-else style="font-size: 12px">{{item.nickname}}</span>
                        </span>
                        <a-badge  :numberStyle="{padding:'0',boxShadow:'none',height:'18px',minWidth:'18px',backgroundColor:'#FF6B6B'}" :count="item.num" :overflowCount="99" style="position: absolute;left: 12px;top: 4px;"/>
                        <a-tooltip placement="top" title="当前微信号网络连接异常"  style="position: absolute;left: 5px;top: 25px;">
                            <img  src="static/img_file/warning.svg" alt="" style="width: 15px;height: 15px" v-if="item.isError">
                        </a-tooltip>
                    </div>
                </div>
            </div>
            <div style="width:300px;flex: 0 0 300px" class="wp">
                <!--顶部搜索框-->
                <div class="search-input">
                     <a-input :style="{display:'inline-block',width:!searchIconHid?'168px':'100%'}" placeholder="输入搜索内容" v-model="searchKey" ref="searchKey" @focus="searchMsgInfo" @change="searchContact(false)" @keyup.enter="searchContact(true)" @compositionstart="compositionstart" @compositionend="compositionend"><!-- @blur='searchhidInfo' -->
                        <a-icon slot="prefix" type="search" :style="{ fontSize: '32px',fontWeight:'700',color:'#000'}"/>
                        <a-icon  slot="suffix" type="close-circle" style="color: #ccc;" theme = "filled" @click="emitEmpty" v-if="searchIconHid" />
                    </a-input>
                    <a-tooltip placement="top" title="一键清理" :style="{'marginLeft':selectWx.wx_type!='20'?'0':'36px'}">
                    <img src="../../assets/clear.svg" v-if="!searchIconHid" alt="" style="width:20px;display:inline-block;verticale-align:middle;font-size: 20px;cursor:pointer;color:#d6d6d6;margin:0 6px;" @click="allRead()">
                    </a-tooltip>
                    <a-tooltip placement="top" title="新建群聊" :style="{'display':selectWx.wx_type!='20'?'inline-block':'none'}">
                    <img src="../../assets/square.svg" alt=""   @click="creatGroup()" style="width:20px;display:inline-block;verticale-align:middle;font-size: 20px;cursor:pointer;color:#d6d6d6;margin:0 6px;">
                    <!-- <a-icon type="plus-square" theme="filled" class="" v-if="!searchIconHid" style="display:inline-block;verticale-align:middle;font-size: 32px;position:relative;top:8px;cursor:pointer;color:#d6d6d6"></a-icon> -->
                    </a-tooltip>
                    <a-tooltip placement="top" title="新建分组">
                        <img src="../../assets/goupIcon.svg" v-if="!searchIconHid" @click="creatCustomerGroup()" alt="" style="width:20px;display:inline-block;verticale-align:middle;font-size: 20px;cursor:pointer;color:#d6d6d6;margin:0 6px;">
                    </a-tooltip>
                </div>
                <!--分组列表-->
                <div class="group-list" v-if="!searchInfoFlg">
                    <a-dropdown :trigger="['click']">
                        <span class="ant-dropdown-link">{{selectGroup.name}}<a-icon type="down" /></span>
                        <a-menu slot="overlay" class="user-group-menu" @click="userGroupClick">
                            <a-menu-item v-for="(item,index) in userGroupList" :key="item.id" class="user-group-item" :style="{'display':selectGroup.id==item.id?'none':'list-item'}">
                                {{item.name}}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
                <div class="tab-search" v-if="searchInfoFlg">
                    <a-tabs :defaultActiveKey="1" class="searchNav" size='small' v-model="searchTab_key" @change="tabKeychange">
                        <a-tab-pane tab="全部" key="0"  >
                            <!-- <data-status :width="150" :hieght="150" class="stausPage-2" v-if="!searchListAll.length"></data-status> -->
                            <div class="searchAll" >
                                <div >
                                    <div class="title">联系人</div>
                                    <div :class="['searchAll-contentList',customIdx===indx?'actvIdx':'','']" v-for="(item,indx) in searchListAll[0].Contacts "  :key="indx" v-if='indx<getMorlist' @click="searchContext(item,indx,1)" >
                                        <img :src="item.avatar_url" />
                                        <span v-html="item.remark?item.remark:item.nickname" style="width: calc(100% - 50px);text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display: inline-block;vertical-align: middle"></span>
                                    </div>
                                    <img src="../../assets/status.svg" alt=""  class="stausPage-3" v-if="!searchListAll[0].Contacts.length" >
                                    <div class="getMor" @click="getSearchMor(0)" v-if="searchListAll[0].Contacts.length>getMorlist">查看更多></div>
                                </div>
                                <div  >
                                    <div class="title">群聊</div>
                                    <div  :class="['searchAll-content',groupIdx===indx?'actvIdx':'']" v-for="(item,indx) in searchListAll[1].Group_chat "  :key = "indx" v-if='indx<getMorlist' @click="searchContext(item,indx,2)">
                                        <img src="../../assets/room_avatar.png" style="float:left;"/>
                                        <!-- <span v-html="item.roomname?item.roomname:'未命名'" ></span> -->
                                        <div style="display:inline-block;float:left;width:calc(100% - 50px)" >

                                            <p v-html="item.roomname?item.roomname:'未命名'" style="margin:0;height: 38px;line-height: 40px;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;"></p>
                                            <!--<p style="margin:0;height:22px;line-height:24px;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;" v-if="item.content.length>0">-->
                                                <!--包含：<span v-for="(vale,cont) in item.content" :key="cont" v-html="vale" style="margin-right: 3px"></span>-->
                                            <!--</p>-->
                                        </div>
                                    </div>
                                    <img src="../../assets/status.svg" alt=""  class="stausPage-3" v-if="!searchListAll[1].Group_chat.length">
                                    <div class="getMor" @click="getSearchMor(1)" v-if="searchListAll[1].Group_chat.length>getMorlist">查看更多></div>
                                </div>
                                <div >
                                    <div class="title">聊天记录</div>
                                    <div :class="['searchAll-content',histIdx===indx?'actvIdx':'']" v-for="(item,indx) in searchListAll[2].Record " :key = "indx" v-if='indx<getMorlist' @click="searchContext(item,indx,3)">
                                        <img :src="item.chat_type=='10'?item.avatar_url:pngFlag" style="float:left;"/>
                                        <!-- <span style="position:absolute;top:-12px;">{{item.roomname?item.roomname:''}}</span> -->
                                        <!-- <p style="position:absolute;top:10px;height:20px;font-size:12px;left:52px;">{{item.total==='1'?'包含：'+item.content:item.total+'条相关聊天记录'}}</p> -->
                                        <div style="display:inline-block;float:left;" >
                                            <span style="position:absolute;top:-12px;left:56px;width: calc(100% - 80px);text-overflow: ellipsis;overflow:hidden; white-space:nowrap;"  v-html="item.remark?item.remark:item.roomname"></span>
                                            <p style="position:absolute;top:28px;height:22px;line-height: 22px;font-size:12px;left:56px;width: calc(100% - 80px);text-overflow: ellipsis;white-space: nowrap;overflow:hidden;">
                                                <span v-if="item.total>1">包含：{{item.total}} 条相关聊天记录</span>
                                                <span v-if="item.total>1?false:true" v-html="item.content" style=""></span>
                                            </p>
                                        </div>
                                    </div>
                                     <img src="../../assets/status.svg" alt=""  class="stausPage-3" v-if="!searchListAll[2].Record.length">
                                    <div class="getMor" @click="getSearchMor(2)" v-if="searchListAll[2].Record.length>getMorlist">查看更多></div>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="联系人" key="1" class="searchAll">
                            <img src="../../assets/status.svg" alt="" v-if="!searchListCustomer.length"  class="stausPage-2">
                            <div class="title" v-if="searchListCustomer.length">联系人</div>
                            <div :class="['searchAll-contentList',customIdx===indx?'actvIdx':'',]" v-for="(item,indx) in searchListCustomer" :key = "indx"  @click="searchContext(item,indx,1)">
                                <img :src="item.avatar_url" />
                                <span v-html="item.remark?item.remark:item.nickname" style="width: calc(100% - 50px);text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display: inline-block;vertical-align: middle"></span>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="群组" key="2" class="searchAll">
                            <div class="title" v-if="searchListCustomer.length">群组</div>
                            <img src="../../assets/status.svg" alt=""  v-if="!searchListCustomer.length"  class="stausPage-2">
                            <div :class="['searchAll-content',groupIdx===indx?'actvIdx':'','clr']" v-for="(item,indx) in searchListCustomer" :key = "indx" @click="searchContext(item,indx,2)">
                                <img src="../../assets/room_avatar.png" style="float:left;"/>
                                <div style="display:inline-block;float:left;width:calc(100% - 50px)" >
                                    <p v-html="item.roomname" style="margin:0;height: 38px;line-height: 40px;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;"></p>
                                    <!--<p style="margin:0;height:22px;line-height:24px;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;" v-if="item.content.length>0">-->
                                        <!--包含：<span v-for="(text,int) in item.content" :key="int" v-html="text" style="margin-right: 3px"></span>-->
                                    <!--</p>-->
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="聊天记录" key="3" class="searchAll">
                            <div class="title" v-if="searchListCustomer.length">聊天记录</div>
                            <img src="../../assets/status.svg" alt=""  v-if="!searchListCustomer.length"   class="stausPage-2">
                            <div :class="['searchAll-content',histIdx===indx?'actvIdx':'','clr']" v-for="(item,indx) in searchListCustomer" :key = "indx" @click="searchContext(item,indx,3)">
                                <img :src="item.chat_type=='10'?item.avatar_url:pngFlag" style="float:left;"/>
                                <div style="display:inline-block;float:left;" >
                                    <span style="position:absolute;top:-12px;left:56px;width: calc(100% - 80px);text-overflow: ellipsis;overflow:hidden; white-space:nowrap;"  v-html="item.remark?item.remark:item.roomname"></span>
                                    <p style="position:absolute;top:28px;height:22px;line-height: 22px;font-size:12px;left:56px;width: calc(100% - 80px);text-overflow: ellipsis;white-space: nowrap;overflow:hidden;">
                                        <span v-if="item.total>1">包含：{{item.total}} 条相关聊天记录</span>
                                        <span v-if="item.total === '1'" v-html="item.content"></span>
                                    </p>
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
                <!--联系人列表-->
                <div class="contact-list" ref="contactList" id="contactList">
                    <contact-item v-for="(item,index) in contactList" :key="index" :contact="item" :index="index" @select="onSelect" @action='onAction' :searchKey="searchKey" ref="contactItem" @clear="clearContact"></contact-item>
                </div>
            </div>

            <div style="flex:1 1 auto;" >
                <div class="chat-header">
                    <!--<span style="float: left;color: rgba(153, 153, 153, 1)">机器人名称：{{selectContact.robot_nickname}}</span>-->
                    {{selectContact.chat_type=='20'?(selectContact.roomname||'未命名的群'):(selectContact.remark==''||selectContact.remark==undefined)?selectContact.nickname:selectContact.remark}}
                    <img v-if="selectContact.chat_type=='20'&&selectContact.friend_user_name.search(/@im.chatroom/)!=(-1)" src="../../assets/companyWx.png" alt="" style="height: 17px">
                    <div class="jump-btn" v-if="searchStatus&&searchChatList.length>0">
                        <div style="text-align: right;line-height: 24px">
                            <a-button type="primary" size="small"  @click="emitEmpty">
                                进入聊天
                            </a-button>
                        </div>
                        <a-button type="primary" size="small" @click="jumpPosition('previous')">
                            <a-icon type="up" />
                            上一条
                        </a-button>
                        <a-button type="primary" size="small" @click="jumpPosition('next')">
                            <a-icon type="down" />
                            下一条
                        </a-button>
                    </div>
                </div>
                <!--聊天框-->

                <div class="chat-content" ref="chatContent" id="chatContent" @wheel="scrollChatContent($event)"  >
                    <div v-if="!searchStatus">

                        <chat-msg-item v-for="(item,index) in chatMsgList" ref="chatMsgItem" :groupSelestList='selectNum' @material="material"  :key="index" :chatMsg="item" :chatIndex="index" @forWardObj='forWardObj' :selectNumflg="selectNumflg" :msgAtStatus="msgAtStatus" @forWardItem="forWardItem" :forWardSelect='forWardSelect' :msgRetract="msgRetract" :liveChatAction='liveChatAction' @select="selectAtUser" @rightClick="rightClick">

                        </chat-msg-item>
                    </div>
                    <div v-if="searchStatus">

                        <chat-msg-item v-for="(item,index) in searchChatList" :key="index" :chatMsg="item" :chatIndex="index" >

                        </chat-msg-item>
                    </div>
                </div>
                <!-- 拖拽上传 -->

                <!--输入框-->
                <div class="input-content" :class="[focus_blur?'bg-f':'']" style="position:relative">
                    <div  v-if="forWardSelect">
                        <p style="position: absolute;z-index: 99999;">已选（{{selectNum.length}}/5）条</p>
                        <div class="forWard">
                            <div @click="forWradList">
                                <div>
                                    <a-icon type="retweet" class="forWardIcon"></a-icon>
                                </div>
                                <p>逐条转发</p>
                            </div>
                            <!--<div>-->
                                <!--<div>-->
                                    <!--<a-icon type="download" class="forWardIcon"></a-icon>-->
                                <!--</div>-->
                                <!--<p>下载</p> -->
                            <!--</div>-->
                            <div @click='svaeMaterial'>
                                <div>
                                    <a-icon type="save" class="forWardIcon"></a-icon>
                                </div>
                                <p>保存素材</p>
                            </div>
                            <div>
                                <div @click="cancelForward">
                                    <a-icon type="close-circle" class="forWardIcon"></a-icon>
                                </div>
                                <p>取消</p>
                            </div>
                        </div>
                    </div>
                    <div class="tools">
                        <div style="position: relative">
                            <a-icon type="smile" @click="showEmoji()" id="showEmoji"/>
                            <div v-if="emojiFlag" id="emoji">
                                <a href="javascript:;" v-for="(item,index) in emojiList" v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
                            </div>
                        </div>
                        <!--<div>-->
                            <!--<a-icon type="audio"/>-->
                        <!--</div>-->
                        <div>
                            <a-upload name="file" action="/index.php?r=uc/user/upload"   :beforeUpload="beforeUpload" accept='image/jpg,image/jpeg,image/png' :showUploadList="false" :headers="headers">
                                <!--<a-icon type="picture" />-->
                                <img src="../../assets/v2_priwta.png" alt="" style="width: 20px;height: 20px;vertical-align: baseline">
                            </a-upload>
                        </div>
                        <div v-if="selectWx.wx_type!='20'">
                            <a-upload name="file" action="/index.php?r=uc/user/upload" :beforeUpload="fileBeforeUpload" :showUploadList="false" :headers="headers">
                                <img src="../../assets/v2_priwvg1.png" alt="" style="width: 20px;height: 20px;vertical-align: baseline">
                            </a-upload>
                        </div>
                        <div>
                            <a-icon type="scissor" style="transform:rotate(-90deg)" @click="startCapture"/>
                            <!--<a-tooltip placement="bottomLeft" @click="startCapture">-->
                                <!--<template slot="title">-->
                                    <!--<span>截图</span>-->
                                <!--</template>-->
                                <!--<a-icon type="scissor" style="transform:rotate(-90deg)"/>-->
                            <!--</a-tooltip>-->
                        </div>
                    </div>
                    <div class="input-content-area">
                        <!-- paste -->
                        <div-edit-area id="text_area"  :formItem="sendObj" :fileList="fileList" ref="div_edit" @remove="removeFile" @isflag="getisflag" @change="editContentFB" @atuser="getAtUser" @keyevent="keyEvent" :atStatus="atRoomUserStatus"  ></div-edit-area>
                        <div class="send-action">
                            <span  class="desc ng-scope">按下Shift+Enter换行</span>
                            <a-tooltip placement="top" :visible="showSendNotice">
                                <template slot="title">
                                    <span>{{SendNoticeMsg}}</span>
                                </template>
                                <a-button class="btn_send" :class="{'bg-b':sendObj.text!=''}"  @click="sendMsg()">发送</a-button>
                            </a-tooltip>
                        </div>
                        <!--@成员框-->
                        <at-room-user class="at-room-user" :roomUser="atRoomUser" ref="at_room_user" id="atRoomUser" @select="selectAtUser" v-if="atRoomUserStatus" :atTop="atTop" :atLeft="atLeft">

                        </at-room-user>
                    </div>
                </div>
            </div>
            <!--<div style="border-left: 1px solid #dcdcdc;min-width: 300px;width: 25%" >-->
            <div :style="{display:showFlg?'block':'none',position:!showRightFlg?'':'absolute',right:!showRightFlg?'':'84px',height:!showRightFlg?'100%':'calc(100% - 116px)'}" class="contentRight" >
                <!-- <div class="right-header"></div> -->
                <div class="right-content"  ref="chatHistoryContent">
                    <div v-if="rightKey==0" class="contact-info">
                        <div class="info">
                            <!--个人号查看个人号、及企业号  selectWx.wx_type=='10'-->
                            <div v-if="selectWx.wx_type!='20'&&selectContact.chat_type=='10'">
                                <div>
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户信息</span>
                                    <span v-if="selectContact.wx_type=='20'" style="float: right;cursor: pointer;color: #5AA9CD" @click="contactWxInfoSave()">
                                        <a-icon type="edit" />
                                        <span >{{contactWxInfoEdit?'保存':'编辑'}}</span>
                                    </span>
                                </div>
                                <div style="margin-top: 10px">
                                    <img :src="selectContact.avatar_url" alt="" style="width: 72px;height: 72px;border-radius: 8px;margin-right: 5px">
                                    <div style="display: inline-block;color: #535252;width: calc(100% - 110px);vertical-align: top;">
                                        <div style="margin:0 0 10px 0;">
                                            <span style="color: #001529;font-weight: 700;margin-right: 2px">
                                                {{selectContact.wx_type=='20'?contactInfo.nickname:contactInfo.remark||contactInfo.nickname}}
                                                <span v-if="selectContact.wx_type=='20'" style="color:#FF9800">@{{selectContact.corp_name}}</span>
                                            </span>
                                            <span v-if="contactInfo.sex=='10'" style="width: 20px;height: 20px;border-radius: 50%;background: #2D9BFC;position: relative;display: inline-block;vertical-align: bottom">
                                                <img src="../../assets/boy.svg" alt="" style="width: 15px;height: 15px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
                                            </span>
                                            <span v-if="contactInfo.sex=='20'" style="width: 20px;height: 20px;border-radius: 50%;background: #FC382D;position: relative;display: inline-block;vertical-align: bottom">
                                                <img src="../../assets/girl.svg" alt="" style="width: 15px;height: 15px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
                                            </span>
                                        </div>
                                        <div :class="[contactWxInfoEdit?'special-input1':'']">
                                            <span v-if="selectContact.wx_type=='10'" style="display: inline-block;vertical-align: middle">微信号：</span>
                                            <span v-if="selectContact.wx_type=='20'" style="display: inline-block;vertical-align: middle">备注：</span>
                                            <span v-if="!contactWxInfoEdit" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);display: inline-block;vertical-align: middle">{{selectContact.wx_type=='10'?contactInfo.username:contactInfo.remark}}</span>
                                            <a-input v-if="contactWxInfoEdit" class="special-input" v-model="contactInfo.remark"/>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 10px;padding-top: 10px;border-top: 1px solid #f0f0f0">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;display: inline-block;vertical-align: middle">客户类型</span>
                                    <span style="float: right;">
                                        <span style="display: inline-block;vertical-align: middle">{{selectContact.wx_type!='20'?'普通微信':'企业微信'}}</span>
                                        <img v-if="selectContact.wx_type=='10'" src="../../assets/personalWx.png" alt="" style="height: 15px">
                                        <img v-if="selectContact.wx_type=='20'" src="../../assets/companyWx.png" alt="" style="height: 15px">
                                    </span>
                                </div>
                                <div style="margin-top: 10px;padding-top: 10px;border-top: 1px solid #f0f0f0">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;display: inline-block;vertical-align: middle">{{selectContact.wx_type!='20'?'微信信息':'企业信息'}}</span>
                                    <span v-if="selectContact.wx_type!='20'" style="float: right;cursor: pointer;color: #5AA9CD" @click="contactInfoSave()">
                                        <a-icon type="edit" />
                                        <span >{{contactInfoEdit?'保存':'编辑'}}</span>
                                    </span>
                                </div>
                                <!--微信信息-->
                                <div v-if="selectContact.wx_type!='20'" style="margin-top: 10px">
                                    <div style="padding:10px 0 10px 0;">
                                        <div :class="[contactInfoEdit?'special-input1':'']" style="margin-bottom:10px;">
                                            <span style="display: inline-block">备注：</span>
                                            <span v-if="!contactInfoEdit" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark}}</span>
                                            <a-input v-else class="special-input" v-model="contactInfo.remark"/>
                                        </div>
                                        <div :class="[contactInfoEdit?'special-input1':'']" style="margin-bottom:10px;">
                                            <span style="display: inline-block">生日：</span>
                                            <span v-if="!contactInfoEdit" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.birth}}</span>
                                            <a-date-picker v-else placeholder="生日"  :defaultValue="contactInfo.birth?moment(contactInfo.birth, 'YYYY-MM-DD'):null"  @change="onChangeBirth" :disabledDate="disabledDate" />

                                            <!--<a-input v-else class="special-input" v-model="contactInfo.birth"/>-->
                                        </div>
                                        <div :class="[contactInfoEdit?'special-input1':'']" style="margin-bottom:10px;">
                                            <span style="display: inline-block">地区：</span>
                                            <a-tooltip placement="left" >
                                                <template slot="title">
                                                    <span v-if="!contactInfoEdit">{{contactInfo.address}}</span>
                                                </template>
                                                <span v-if="!contactInfoEdit"  style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 50px);display: inline-block;vertical-align: bottom">{{contactInfo.address}}</span>
                                            </a-tooltip>
                                            <a-input v-if="contactInfoEdit" class="special-input" v-model="contactInfo.address"/>
                                        </div>
                                        <!--<div class="liveChat" style="margin-bottom:10px;">-->
                                        <div :class="[contactInfoEdit?'special-input1':'']" style="margin-bottom:10px;">
                                            <span style="display: inline-block">手机号：</span>
                                            <!--<span v-if="!contactInfo.tel_arr.length">&#45;&#45;</span>-->
                                            <!--<a-select style="width:150px;" v-model='liveChattel'  @change="telChange" v-if="contactInfo.tel_arr.length">-->
                                                <!--<a-select-option  v-for="(item,idx) in contactInfo.tel_arr" :key="idx" >-->
                                                    <!--{{item}}-->
                                                <!--</a-select-option>-->
                                            <!--</a-select>-->
                                            <!--<span style="background:#5AA9CD;padding:0 4px;cursor:pointer;" @click='liveChatCall' v-if="contactInfo.tel_arr.length">-->
                                                <!--<a-icon type="phone" theme="filled" fill='blue' style="color:#fff;"/>-->
                                            <!--</span>-->
                                            <span v-if="!contactInfoEdit"  style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);display: inline-block;vertical-align: bottom">{{contactInfo.tel}}</span>
                                            <a-input v-else class="special-input" v-model="contactInfo.tel"/>
                                        </div>
                                    </div>
                                    <!--<div style="color: #A29F9F;margin-top: 10px">-->
                                        <!--{{contactInfo.sign}}-->
                                    <!--</div>-->
                                </div>
                                <!--企业信息-->
                                <div v-if="selectContact.wx_type=='20'" style="margin-top: 10px">
                                    <div style="padding:10px 0 10px 0;">
                                        <div style="margin-bottom:10px;">
                                            <span style="display: inline-block">企业：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.corp_full_name}}</span>
                                        </div>
                                        <div style="margin-bottom:10px;">
                                            <span style="display: inline-block">实名：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.name}}</span>
                                        </div>
                                        <div class="liveChat" style="margin-bottom:10px;">
                                            <span style="display: inline-block">手机号：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark_mobiles}}</span>
                                        </div>
                                        <div  style="margin-bottom:10px;">
                                            <span style="display: inline-block">邮箱：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark_email}}</span>
                                        </div>
                                        <div style="margin-bottom:10px;">
                                            <span style="display: inline-block">地址：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark_address}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 30px">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户来源</span>
                                    <span style="float: right">{{contactInfo.friend_from!=''?contactInfo.friend_from:'-'}}</span>
                                </div>
                                <div style="margin-top: 30px">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户标签</span>
                                    <span style="float: right;cursor: pointer;color: #5AA9CD" @click="contactAddTag()">
                                        +添加
                                    </span>
                                </div>
                                <div style="margin: 10px 10px 0 10px">
                                    <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">
                                        {{item.label_name}}
                                    </a-tag>
                                </div>
                                <div style="margin-top: 30px" v-if="selectContact.wx_type!='20'">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户描述</span>
                                    <span style="float: right;cursor: pointer;color: #5AA9CD" @click="contactDescSave">
                                        <a-icon type="edit" />
                                        <span >{{contactDescEdit?'保存':'编辑'}}</span>
                                    </span>
                                </div>
                                <div style="margin-top: 10px" v-if="selectContact.wx_type!='20'">
                                    <span v-if="!contactDescEdit" style="display: block;height: 130px;width: 90%;margin: 0 auto;background: #F7F5F5;color: #645F5F;overflow-y: auto;padding: 4px 11px">{{contactInfo.desc}}</span>
                                    <a-textarea v-else v-model="contactInfo.desc" style="display: block;width: 90%;margin: 0 auto;background: #F7F5F5;height: 130px;overflow-y: auto"/>
                                </div>
                                <div style="margin-top: 30px;" class='clar'>
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;float:left">创建群聊</span>
                                    <a-icon type="plus-square" theme="filled" class="" style="float:right;verticale-align:middle;font-size: 20px;cursor:pointer;color:#5AA9CD" @click="creatGroup(contactInfo)"></a-icon>
                                </div>
                                <!--<div class="groupManage">-->
                                    <!--<div style="margin: 20px 0 20px;" >-->
                                        <!--<span class="title" >消息免打扰</span>-->
                                        <!--<span style="float: right;cursor: pointer" >-->
                                           <!--<a-switch checkedChildren="开" unCheckedChildren="关" v-model="selectContact.no_hint=='1'?true:false"  @click="noHint()"/>-->
                                        <!--</span>-->
                                    <!--</div>-->
                                    <!--<div style="margin: 20px 0 20px;" >-->
                                        <!--<span class="title" >消息置顶</span>-->
                                        <!--<span style="float: right;cursor: pointer" >-->
                                            <!--<a-switch checkedChildren="开" unCheckedChildren="关" v-model="selectContact.top_set=='1'?true:false" @click="contactTopping()"/>-->
                                        <!--</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                            </div>
                            <!--个人号查看外部群、内部群-->
                            <div v-if="selectWx.wx_type!='20'&&selectContact.chat_type=='20'" class="groupManage">
                                <div>
                                    <span class="title" >群成员</span>
                                </div>
                                <div style="margin-top: 10px;" class="listPerson">
                                        <div class="addPerson" @click="creatGroup('action-add')" v-if="contactInfo.isInRoom">
                                            <a-icon type="plus-square" class="square"></a-icon>
                                            <p>添加</p>
                                        </div>
                                        <div class="deletPerson" @click="creatGroup('action-delt')" v-if="contactInfo.is_own&&contactInfo.isInRoom">
                                            <a-icon type="minus-square" class="square"></a-icon>
                                            <p>删除</p>
                                        </div>
                                        <div v-for="(item,idx) in groupUserList" :key = 'idx' class="listPerson-content" v-if='idx<morlist'>
                                            <img :src="item.header_img_url" alt="" class="imgUrI">
                                            <p style="overflow:hidden;" class="groupTitle">{{item.remark?item.remark:item.room_nickname?item.room_nickname:item.nickname}}</p>
                                        </div>
                                        <p class="more" @click="getmoreList(2)" v-if="groupUserList.length>=10"><a-icon type="line" class="moreIcon"></a-icon> {{getMorFlg?'收起更多群成员':'查看更多群成员'}} <a-icon :type="getMorFlg?'up':'down'" class="moreIcon"></a-icon><a-icon type="line" class="moreIcon"></a-icon></p>
                                </div>
                                <div style="margin: 10px 0 10px;" >
                                    <span class="title" >群名称</span>
                                    <span :style="{'float': 'right','cursor': 'pointer','color':contactInfo.isInRoom?'#5AA9CD':'#C1C1C1'}" @click="changeEdit('1')">
                                        <a-icon type="edit" />
                                        <span >{{groupName?'保存':'编辑'}}</span>
                                    </span>
                                </div>
                                <div >
                                    <span style="padding-left:16px;color:#565656a6;" v-if="!groupName">{{contactInfo.room_name}}</span>
                                    <a-input style="display:inline-block;width: 90%;margin-left: 14px;" v-model="contactInfo.room_name" placeholder="输入群名称" v-if="groupName">
                                    </a-input>
                                </div>
                                <div style="margin-top: 16px">
                                    <span class="title">群公告</span>
                                    <span :style="{'float': 'right','cursor':'pointer','color':contactInfo.is_own&&contactInfo.isInRoom?'#5AA9CD':'#C1C1C1'}" @click="roomNoticeSave">
                                        <a-icon type="edit" />
                                        <span v-if="contactInfo.is_own">{{roomNoticeEdit?'保存':'编辑'}}</span>
                                        <span v-else>非群主，不能编辑</span>
                                    </span>
                                </div>
                                <div style="margin-top: 10px">
                                    <span v-if="!roomNoticeEdit" style="display: block;min-height: 30px;width: 90%;margin: 0 auto;background: #F7F5F5;color: #565656a6;overflow-y: auto;padding: 4px 11px">{{contactInfo.RoomNotice}}</span>
                                    <a-textarea v-else v-model="contactInfo.RoomNotice" style="display: block;width: 90%;margin: 0 auto;background: #F7F5F5;max-height: 130px;overflow-y: auto"/>
                                </div>
                                <div style="margin: 10px 0 10px;" >
                                    <span class="title" >我在本群的昵称</span>
                                    <span :style="{'float': 'right','cursor': 'pointer','color':contactInfo.isInRoom?'#5AA9CD':'#C1C1C1'}" @click="changeEdit('2')">
                                        <a-icon type="edit" />
                                        <span >{{groupNickname?'保存':'编辑'}}</span>
                                    </span>
                                </div>
                                <div>

                                    <span style="padding-left:16px;color:#565656a6" v-if="!groupNickname">{{contactInfo.room_nickname?contactInfo.room_nickname:''}}</span>
                                    <a-input v-if="groupNickname" v-model="contactInfo.room_nickname" style="display:inline-block;width: 90%;margin-left: 14px;">
                                    </a-input>
                                </div>
                                <!--<div style="margin-top: 20px">-->
                                    <!--<span class="title" >群托管</span>-->
                                    <!--<span :style="{'float': 'right','cursor': 'pointer','color':contactInfo.isInRoom?'#5AA9CD':'#C1C1C1'}" @click="collocationOne()" v-if="contactInfo.is_own">-->
                                        <!--<a-icon type="edit" />-->
                                        <!--<span >编辑</span>-->
                                    <!--</span>-->
                                <!--</div>-->
                                <!--<div style="margin-top: 10px">-->
                                    <!--<div style="margin-left: 20px;margin-bottom: 15px">-->
                                        <!--<span>欢迎语：</span>-->
                                        <!--<a-tag v-for="(item,index) in welcome_own"  :key="index" style="margin-bottom: 10px">{{item.name}}</a-tag>-->
                                    <!--</div>-->
                                    <!--<div style="margin-left: 20px">-->
                                        <!--<span>关键词：</span>-->
                                        <!--<a-tag v-for="(item,index) in auto_reply_own"  :key="index" style="margin-bottom: 10px">{{item.class_name}}</a-tag>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <div style="margin-top: 14px">
                                    <span class="title">群标签</span>
                                    <span :style="{'float': 'right','cursor': 'pointer','color':contactInfo.isInRoom?'#5AA9CD':'#C1C1C1'}" @click="contactAddTag()">
                                        +添加
                                    </span>
                                </div>
                                <div style="margin: 10px 10px 0 10px">
                                    <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px;border-radius:10px;" :class="['tag-color' + item.color_id]">
                                        {{item.label_name}}
                                    </a-tag>
                                </div>
                                <!--<div style="margin: 20px 0 20px;" >-->
                                    <!--<span class="title" >消息免打扰</span>-->
                                    <!--<span style="float: right;cursor: pointer" >-->
                                       <!--<a-switch checkedChildren="开" unCheckedChildren="关" v-model="selectContact.no_hint=='1'?true:false"  @change="noHint()" :disabled="!contactInfo.isInRoom"/>-->
                                    <!--</span>-->
                                <!--</div>-->
                                <!--<div style="margin: 20px 0 20px;" >-->
                                    <!--<span class="title" >消息置顶</span>-->
                                    <!--<span style="float: right;cursor: pointer" >-->
                                        <!--<a-switch checkedChildren="开" unCheckedChildren="关" v-model="selectContact.top_set=='1'?true:false" @change="contactTopping()" :disabled="!contactInfo.isInRoom"/>-->
                                    <!--</span>-->
                                <!--</div>-->
                            </div>
                            <!--企业号查看个人号和企业号-->
                            <div v-if="selectWx.wx_type=='20'&&selectContact.chat_type=='10'" class="groupManage">
                                <div>
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户信息</span>
                                </div>
                                <div style="margin-top: 10px">
                                    <img :src="selectContact.avatar_url" alt="" style="width: 72px;height: 72px;border-radius: 8px;margin-right: 5px">
                                    <div style="display: inline-block;color: #535252;width: calc(100% - 110px);vertical-align: top;">
                                        <div style="margin:0 0 10px 0;">
                                            <span style="color: #001529;font-weight: 700;margin-right: 2px">
                                                <!--{{selectContact.wx_type=='20'?contactInfo.name:contactInfo.nickname}}-->
                                                {{contactInfo.name}}
                                                <span v-if="selectContact.wx_type=='20'" style="color:#FF9800">@{{contactInfo.corp_name}}</span>
                                            </span>
                                            <span v-if="contactInfo.gender=='1'" style="width: 20px;height: 20px;border-radius: 50%;background: #2D9BFC;position: relative;display: inline-block;vertical-align: bottom">
                                                <img src="../../assets/boy.svg" alt="" style="width: 15px;height: 15px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
                                            </span>
                                            <span v-if="contactInfo.gender=='2'" style="width: 20px;height: 20px;border-radius: 50%;background: #FC382D;position: relative;display: inline-block;vertical-align: bottom">
                                                <img src="../../assets/girl.svg" alt="" style="width: 15px;height: 15px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%">
                                            </span>
                                        </div>
                                        <div>
                                            <span style="display: inline-block;vertical-align: middle">备注：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);display: inline-block;vertical-align: middle">{{contactInfo.remark}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 10px;padding-top: 10px;border-top: 1px solid #f0f0f0">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;display: inline-block;vertical-align: middle">客户类型</span>
                                    <span style="float: right;">
                                        <span style="display: inline-block;vertical-align: middle">{{selectContact.wx_type=='10'?'普通微信':'企业微信'}}</span>
                                        <img v-if="selectContact.wx_type=='10'" src="../../assets/personalWx.png" alt="" style="height: 15px">
                                        <img v-if="selectContact.wx_type=='20'" src="../../assets/companyWx.png" alt="" style="height: 15px">
                                    </span>
                                </div>
                                <div style="margin-top: 10px;padding-top: 10px;border-top: 1px solid #f0f0f0">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;display: inline-block;vertical-align: middle">企业信息</span>
                                </div>
                                <!--企业信息-->
                                <div style="margin-top: 10px">
                                    <div style="padding:10px 0 10px 0;">
                                        <div style="margin-bottom:10px;">
                                            <span style="display: inline-block">企业：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.corp_full_name}}</span>
                                        </div>
                                        <div style="margin-bottom:10px;">
                                            <span style="display: inline-block">实名：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.name}}</span>
                                        </div>
                                        <div class="liveChat" style="margin-bottom:10px;">
                                            <span style="display: inline-block">手机号：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark_mobiles}}</span>
                                        </div>
                                        <div style="margin-bottom:10px;">
                                            <span style="display: inline-block">邮箱：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark_email}}</span>
                                        </div>
                                        <div  style="margin-bottom:10px;">
                                            <span style="display: inline-block">地址：</span>
                                            <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: calc(100% - 60px);vertical-align: bottom">{{contactInfo.remark_address}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 30px">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户标签</span>
                                    <span style="float: right;cursor: pointer;color: #5AA9CD" @click="contactAddTag()">
                                        +添加
                                    </span>
                                </div>
                                <div style="margin: 10px 10px 0 10px">
                                    <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">
                                        {{item.label_name}}
                                    </a-tag>
                                </div>
                                <!--<div style="margin-top: 30px">-->
                                    <!--<span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">客户描述</span>-->
                                <!--</div>-->
                                <!--<div style="margin-top: 10px">-->
                                    <!--<span style="display: block;height: 130px;width: 90%;margin: 0 auto;background: #F7F5F5;color: #645F5F;overflow-y: auto;padding: 4px 11px">{{contactInfo.description}}</span>-->
                                <!--</div>-->
                            </div>
                            <!--企业号查看内部群和外部群-->
                            <div v-if="selectWx.wx_type=='20'&&selectContact.chat_type=='20'" class="groupManage">
                                <div>
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700">群信息</span>
                                </div>
                                <div style="margin-top: 10px">
                                    <img :src="contactInfo.qr_code" alt="" style="width: 72px;height: 72px;border-radius: 8px;margin-right: 5px">
                                    <div style="display: inline-block;color: #535252;width: calc(100% - 110px);vertical-align: top;">
                                        <div style="margin:0 0 10px 0;">
                                            <span style="color: #001529;font-weight: 700;margin-right: 2px">
                                                {{contactInfo.room_name}}
                                            </span>
                                        </div>
                                        <div>
                                            <span  style="display: inline-block;vertical-align: middle">群成员：{{contactInfo.count}}人</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 10px;padding-top: 10px;border-top: 1px solid #f0f0f0">
                                    <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;display: inline-block;vertical-align: middle">群类型</span>
                                    <span style="float: right;">
                                        <span style="display: inline-block;vertical-align: middle">{{selectContact.wx_type=='10'?'外部群':'内部群'}}</span>
                                        <img src="../../assets/companyWx.png" alt="" style="height: 15px">
                                    </span>
                                </div>
                                <div style="margin-top: 16px">
                                    <span class="title">群公告</span>
                                </div>
                                <div style="margin-top: 10px">
                                    <span  style="display: block;min-height: 30px;width: 90%;margin: 0 auto;background: #F7F5F5;color: #565656a6;overflow-y: auto;padding: 4px 11px">{{contactInfo.RoomNotice}}</span>
                                </div>
                                <div style="margin-top: 14px">
                                    <span class="title">群标签</span>
                                    <span :style="{'float': 'right','cursor': 'pointer','color':contactInfo.isInRoom?'#5AA9CD':'#C1C1C1'}" @click="contactAddTag()">
                                        +添加
                                    </span>
                                </div>
                                <div style="margin: 10px 10px 0 10px">
                                    <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px;border-radius:10px;" :class="['tag-color' + item.color_id]">
                                        {{item.label_name}}
                                    </a-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="rightKey==1" class="material-info">
                        <a-input placeholder="输入搜索内容,搜索快捷回复素材" v-model="searchMaterialKey" ref="searchMaterialKey" @keyup.enter="getFastReply()">
                            <a-icon slot="prefix" type="search" @click="getFastReply()" />
                            <a-icon v-if="searchMaterialKey" slot="suffix" type="close-circle" style="color: #000000" @click="emitMaterialEmpty" />
                        </a-input>
                        <div class="material-list">
                            <div v-for="(item,index) in fastReply" :key="item.id" :style="{'display':(selectWx.wx_type=='20'&&item.type!=1&&item.type!=2)?'none':'inherit'}">
                                <div class="fastReply">
                                    <a-icon type="question-circle" class="quessionIcon" theme='filled' ></a-icon>
                                    <span class="questionTitle">{{!!item.question?item.question:'--'}}</span>
                                </div>
                                <view-material   :dataItem="item" usedType="1"></view-material>
                                <div class="sendBtn">
                                    <a-tooltip placement="topRight" :visible="item.showSendNotice">
                                        <template slot="title">
                                            <span>{{item.SendNoticeMsg}}</span>
                                        </template>
                                        <a-button type="primary" size="small" @click="sendMaterial(item)">发送</a-button>
                                    </a-tooltip>
                                </div>
                                <!--<div class="sendBtn"><a-button type="primary" size="small" @click="sendMaterial(item)">发送</a-button></div>-->
                            </div>
                        </div>
                        <div v-if="!fastReply.length" class="notFound">
                            <data-status :width="150" :hieght="150" class="stausPage"></data-status>
                        </div>
                    </div>
                    <div v-else-if="rightKey==3" class="buy-info">
                        <div style="margin-bottom: 10px">
                            <span style="border-left: 5px solid #5AA9CD;padding-left: 10px;color: #4D4D4D;font-weight: 700;font-size: 14px">订单信息</span>
                        </div>
                        <div v-if="!orderBindStatus">
                            <a-button type="primary" style="width: 100%" @click="orderBindStatus = true;bindLoading = false">绑定</a-button>
                        </div>
                        <div v-if="!orderBindStatus">
                            <buy-record-item v-for="(item,index) in buyHistory" :key="item.id" :recordItem="item"></buy-record-item>
                        </div>
                        <div v-if="!buyHistory.length&&!orderBindStatus" class="notFound">
                            <data-status :width="150" :hieght="150" class="stausPage"></data-status>
                        </div>
                        <div v-if="!orderBindStatus&&moreBuyHistoryFlag" style="text-align:center;height:60px;line-height:50px;">
                            <a-button type="primary" @click="getBuyHistory('1')">查看更多</a-button>
                        </div>
                        <div class="order-bind-page" v-if="orderBindStatus">
                            <div>
                                <a-select v-model="queryParam.platFormId" style="width: 72px"  placeholder='选择平台'>
                                    <a-select-option  v-for="(item,idx) in platFormList" :key="item.id" >
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
                                <a-radio-group name="radioGroup" v-model="queryParam.bindType">
                                    <a-radio value="1">平台账号</a-radio>
                                    <a-radio value="2">手机号</a-radio>
                                    <a-radio value="3">订单号</a-radio>
                                </a-radio-group>
                            </div>
                            <div style="margin: 15px 0">
                                <a-input v-model="queryParam.key" :placeholder="queryParam.bindType=='1'?'请输入对应平台账号':queryParam.bindType=='2'?'请输入对应手机号':'请输入对应订单号'">
                                </a-input>
                            </div>
                            <div>
                                <a-button  type="primary" style="width:100%;margin-bottom: 10px" @click="bind" :loading="bindLoading">确认绑定</a-button>
                                <a-button  type="primary" style="width:100%;background: #B9B9B9;border: none" @click="orderBindStatus = false">取消</a-button>
                            </div>
                            <div style="color: #FF9800;margin: 10px 0">
                                <a-icon type="info-circle"/>
                                绑定之前请先确认商城订单是否有上传数据
                            </div>
                        </div>
                    </div>
                    <div v-show="rightKey==2" class="chat-info">
                        <chat-msg-item v-for="(item,index) in chatHistory" :key="index" :chatMsg="item" style_type="1"></chat-msg-item>
                        <div v-if="!chatHistory.length" class="notFound">
                            <data-status :width="150" :hieght="150" class="stausPage"></data-status>
                        </div>
                    </div>
                    <div v-show="rightKey==4" class="chat-info-friend" >
                        <div class="stausPage-4"   v-if="!firendsList.length">
                            <img src="../../assets/status.svg" alt="" >
                            <p style="width:363px;margin-left: -22px;color:#222;padding:40px 0;">当前好友无朋友圈数据/屏蔽查看</p>
                        </div>
                        <div class="firendsList"  v-for="(items,index) in firendsList" :key ="index">
                            <div class="frliendsWarp">
                                <div class="atvalHead" style="">
                                    <img :src="items.avatar_url" alt="" class="atval" style="width:50px;height:50px;">
                                </div>
                                <div class="head">
                                    <div class="head-title" style="position:relative">
                                        <p class="head-nickName">
                                            <span class="friend" @click="replyMsg(index,items)">{{items.nickname}}</span>
                                            <span :style="{color:items.is_like?'#fc156f':'#40a9ff'}" @click="lovely(items)">
                                                <a-icon type="heart" :theme="items.is_like?'filled':'outlined'" ></a-icon>
                                                 {{items.is_like?'已赞':'点赞'}}
                                            </span>
                                        </p>
                                        <p :class="[textIdx === index && textIdxFlg?'head-min-b':'head-min']" v-html="items.content_text"></p>
                                        <p style="text-align:right;font-size:12px;margin:0;cursor:pointer;color:#5AA9CD;background:#fff;width: 70px;position: absolute;right: -2px;bottom:2px;" v-if="items.textFlg>33" @click="getTextAll(index)">{{textIdx === index&&textIdxFlg?'收起查看':'...查看全部'}}</p>
                                    </div>
                                    <div class="imgWrap">
                                        <div class="imgList" v-for="(item,idx) in items.albumList" :key="idx" :style="{ background:' url('+item.src+') no-repeat center',backgroundSize:'contain'}" >
                                        </div>
                                    </div>
                                    <div class="head-footer">
                                        <span style="color:#828282">{{items.send_time}}</span>
                                        <span  v-if="items.commentList.length>4||items.albumList.length>24" @click="changeListAll(items,index)"><a-icon :type="lovelyFlg === index && (msgFlag||msgFlagB)?'up':'down'" size="14" style="font-size:12px;" ></a-icon> {{lovelyFlg === index && (msgFlag||msgFlagB)?'收起':'展开'}}</span>
                                    </div>
                                </div>
                                <div class="friendsHeart" v-if="items.commentList.length">
                                    <a-icon type="caret-up" style="position: absolute;top: -14px;color:#f0f0f0;font-size:20px;"></a-icon>
                                    <div :class="[lovelyFlg === index && msgFlagB?'choseHeart':'choseHeart choseHeart-b']">
                                        <a-icon type="heart" style="font-size:18px;margin-right:5px;color:#2d9bfc;font-weight:blod;"></a-icon>
                                        <img :src="heart.avatar_url" alt="" class="heartAvtal" v-for="(heart,indx) in items.likeList" :key="indx">
                                    </div>
                                    <div :class="[lovelyFlg === index && msgFlag ? 'leaveMsg':'leaveMsg leaveMsg-b']" >
                                        <img src="../../assets/talkIcon.png" alt="" class="talk">
                                        <div style="float:left;width:260px;">
                                            <div class="talkMsgList" v-for="(msg,num) in items.commentList" :key="num" >
                                                <img :src="msg.avatar_url" alt="" class="talkHead">
                                                <div class="personTalklist">
                                                    <p class="firstMsg" @click="replyMsg(index,msg)">
                                                        <span>{{msg.nickname}}</span>
                                                        <span >{{msg.comment_time}}</span>
                                                    </p>
                                                    <p class="replay">
                                                        <span v-if="!msg.tonickname" v-html="msg.comment" class="textMsg"></span>
                                                        <span v-else>
                                                            回复<span class="replyColor"> {{msg.tonickname}} </span> :<span  v-html="msg.comment"></span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                     <div  style="position: relative;left: 0;top:6px;">
                                        <emj-common :editAre="items.id"  v-on:prams='getMsg'  :dataIndex="index"   :sendObj="askId===index?ask:{}" @close="closeFriendEmoji" ref="emjCommon"></emj-common>
                                        <a-button class="send" @click='sendAskMsg(items,index)'>发送</a-button>
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:center;height:60px;line-height:50px;" v-if="moreFriendCircleFlg">
                            <a-button type="primary" @click="getMoreFriendCircle()">查看更多</a-button>
                        </div>
                    </div>
                </div>
            </div>
             <div class="right-nav " >
                 <div class="right_icon"  @click="right">
                    <a-icon :type="showRightFlg?'menu-fold':'menu-unfold'" style="font-size: 24px"></a-icon>
                 </div>
                 <div class="tabNavWarp" v-for="(item,index) in tabNavList" :key="index">
                     <div @click='tabChange(index)' :class="[index == rightKey?'tabNavActive':'',(selectContact.chat_type=='20'||selectWx.wx_type=='20'||selectContact.wx_type=='20')&&item.id=='5'?'hidden-icon':'',selectContact.chat_type=='20'&&item.id=='4'?'hidden-icon':'','tabNav']" >
                         <a-tooltip placement="left">
                             <template slot="title">
                                 <span>{{item.title}}</span>
                             </template>
                             <!--<a-icon :type="item.icon" class="fontSiz"></a-icon>-->
                             <img v-if="index == rightKey" :src="item.imgW" alt="" style="width: 24px;height: 24px">
                             <img v-else :src="item.imgB" alt="" style="width: 24px;height: 24px">
                         </a-tooltip>
                     </div>
                 </div>
            </div>
        </div>
        <!-- 转移分组 -->
        <a-modal title="选择分组" :visible="moveGroupFlag" @cancel="closeGroup"  @ok="moveGroupFn('1')">
            <p>分组名：</p>
            <p>
                <a-select style="width:100%;" v-model="groupSelect" @change="moveGroup">
                    <a-select-option v-for="(item,index) in moveUserGroupList" :key="item.id">
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </p>
        </a-modal>
        <!-- 新增，编辑，删除分组 -->
        <a-modal title="客户分组" :visible="createGroupFlag" :footer="null" :maskClosable="false" @cancel="createGroupFlag = false;getUserGroupList()" :width="769">
            <div>
                <a-button type="primary" style="width: 100%;margin-bottom: 10px" @click="addUserGroupList">新增分组+</a-button>
            </div>
            <div>
                <a-table :columns="groupColumns" :dataSource="moveUserGroupList" :pagination="false">
                    <template slot="name" slot-scope="text, record, index">
                        <div>
                            <span v-if="!record.editStatus">{{text}}</span>
                            <a-input v-if="record.editStatus&&record.name!='未分组'" v-model="groupCreatName" placeholder="请输入分组名称" style="width: 200px" :maxlength="15"/>
                        </div>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <div>
                            <span v-if="!record.editStatus&&record.name!='未分组'" style="color:#5AA9CD;margin-right: 10px;cursor: pointer" @click="handleGroupOk('1',record,index)">编辑</span>
                            <span v-if="record.editStatus&&record.name!='未分组'" style="color:#5AA9CD;margin-right: 10px;cursor: pointer" @click="handleGroupOk('2',record,index)">保存</span>
                            <a-popconfirm v-if="!record.editStatus&&record.name!='未分组'" title="你确定删除吗？" placement="top" @confirm="handleGroupOk('3',record,index)" okText="确定" cancelText="取消">
                                <a href="javascript:void(0);" style="color: #FE6354;">删除</a>
                            </a-popconfirm>
                            <span v-if="record.editStatus&&record.name!='未分组'" style="color:#8A8A8A;cursor: pointer" @click="handleGroupOk('4',record,index)">取消</span>
                        </div>
                    </template>
                </a-table>
            </div>
        </a-modal>
        <!--发送图片-->
        <a-modal
                title="发送图片"
                cancelText="取消"
                okText="确定"
                :visible="sendImgFlag"
                @ok="handleOk"
                :confirmLoading="confirmLoading"
                @cancel="handleCancel"
        >
            <div  style="text-align: center">
                <img :src="sendObj.img_url" alt="" style="max-width: 300px;max-height: 450px">
            </div>
        </a-modal>
        <!--发送文件-->
        <a-modal
                title="发送文件"
                cancelText="取消"
                okText="确定"
                :visible="sendFileFlag"
                @ok="handleFileOk"
                :confirmLoading="confirmLoading"
                @cancel="fileHandleCancel"
        >

            <div  style="display: inline-block;width: 260px;border: 1px solid #f0f0f0;border-radius: 10px;background: #fff;padding: 10px;position: relative;color: rgb(16,16,16);white-space: normal;word-break: break-all;cursor: pointer;text-align: left;">
                <div style="border-bottom: 1px solid #f0f0f0;line-height: 8px;height: 20px;">{{sendFile.name}}</div>
                <div style="position: relative;margin-top: 10px">
                    <span style="display: inline-block;width: 180px;font-size: 12px;color: #999999;min-height: 40px;line-height: 1.6">{{sendFile.size}}</span>
                    <img src="../../assets/file-img.png" alt="">
                </div>
            </div>
        </a-modal>
        <!--添加标签-->
        <a-modal
                title="选择标签"
                cancelText="取消"
                okText="确定"
                :visible="selectTagFlag"
                @ok="handleTagOk"
                @cancel="selectTagFlag=false"
                :confirmLoading="confirmLoading"
        >
            <div class="tag-modal">
                <a-checkable-tag v-for="(item,index) in allLabel"  :key="item.id" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked)" :class="['tag-color' + item.color_id]">
                    {{item.title}}
                </a-checkable-tag>
            </div>
        </a-modal>
        <!--收款、红包信息-->
        <a-modal
                title="收款信息"
                cancelText="取消"
                okText="确定"
                :visible="orderModal"
                @ok="saveOrderModal"
                @cancel="orderModal=false"
                :width="960"
        >
            <div class="order-content">
                <div class="order-content-left">
                    <div class="left-item">
                        <span class="item-title">客户信息：</span>
                        <img :src="selectMsgOrder.avatar_url" alt="" style="width: 40px;height: 40px;border-radius: 50%">
                        <span>{{selectMsgOrder.nickname}}</span>
                    </div>
                    <div class="left-item">
                        <span class="item-title">收款类型：</span>
                        <a-radio-group  v-model="selectMsgOrder.type" :disabled="true">
                            <a-radio value="1">转账</a-radio>
                            <a-radio value="2">红包</a-radio>
                        </a-radio-group>
                    </div>
                    <div class="left-item">
                        <span class="item-title">收款时间：</span>
                        <span>{{selectMsgOrder.created}}</span>
                    </div>
                    <div class="left-item">
                        <span class="item-title">收款金额：</span>
                        <span>{{selectMsgOrder.content}}</span>
                    </div>
                </div>
                <div class="order-content-right">
                    <div class="left-item">
                        <span class="item-title">收款信息：</span>
                        <a-radio-group  v-model="orderDetail.cl_type">
                            <a-radio value="1">订单</a-radio>
                            <a-radio value="2">其他</a-radio>
                        </a-radio-group>
                    </div>
                    <div style="background: #ededed;padding:15px 30px">
                        <div class="left-item" v-if="orderDetail.cl_type=='1'">
                            <span class="item-title">类型：</span>
                            <a-radio-group  v-model="orderDetail.order_type"  >
                                <a-radio value="10">购买</a-radio>
                                <a-radio value="20">赠送</a-radio>
                            </a-radio-group>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='1'">
                            <span class="item-title">类别：</span>
                            <a-select v-model="orderDetail.type_class" @change="handleClassChange" style="width: 450px">
                                <a-select-option v-for="(item,index) in goodsClass" :key="item.id" >
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='1'">
                            <span class="item-title">名称：</span>
                            <a-select v-model="orderDetail.goods_id" style="width: 450px">
                                <a-select-option v-for="(item,index) in goodsAll" :key="item.id">
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='1'" style="margin-bottom: 9px">
                            <span class="item-title">数量：</span>
                            <a-input v-model="orderDetail.num" maxlength="10" style="width: 450px"/>
                        </div>
                        <div class="left-item">
                            <span class="item-title" style="vertical-align: top">备注：</span>
                            <a-textarea :rows="3" v-model="orderDetail.desc" maxlength="25" style="width: 450px"/>
                        </div>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal title="托管" :visible="collocation_visible" @cancel="collocation_visible=false" width="50%" @ok="handleTagOkRoom">
            <div>
                <span>欢迎语：</span>
                <div class="tag-modal1">
                    <a-checkable-tag v-for="(item,index) in welcomeList"  :key="index" :checked="item.check" @change="(checked) => handleTagChangeRoom(item,index, checked,'1')">
                        {{item.name}}
                    </a-checkable-tag>
                </div>
            </div>
            <div style="margin-top:50px">
                <span>关键词回复：</span>
                <div class="tag-modal1" >
                    <a-checkable-tag v-for="(item,index) in replyList"  :key="index" :checked="item.check" @change="(checked) => handleTagChangeRoom(item,index, checked,'2')">
                        {{item.class_name}}
                    </a-checkable-tag>
                </div>
            </div>
        </a-modal>
        <a-modal :visible="previewVideo" :footer="null" @cancel="previewVideo = false" class="moadalVideo" width="400px">
             <video controls style="width:100%;height:100%" v-if="previewVideo">
                <source :src="videoPath" type="video/mp4">
            </video>
		</a-modal>
        <a-modal :visible='craetGroupObj.creatGroupMdal' :footer="null" width='660px' @cancel="cancelGroupMoadl">
            <div class="creatGpTitle">
                {{craetGroupObj.flg}}
            </div>
            <div class="creat-content">
                <div class="crear-content-left">
                    <div style="margin: 10px 0 10px;" v-if="craetGroupObj.groupMaster">
                        <span class="title" >群主</span>
                    </div>
                    <div v-if="craetGroupObj.groupMaster">
                        <a-select v-model="groupPramas.robotIdx" @change="handlerobotChange" class="group-inpt" plcaeholder="请选择群主">
                            <a-select-option v-for="(item,index) in craetGroupObj.robotList" :key="item.id" >
                                {{item.nickname}}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div style="margin: 10px 0 10px;" v-if="craetGroupObj.showName">
                        <span class="title" >群名称</span>
                    </div>
                    <div v-if="craetGroupObj.showName">
                        <a-input style="display:inline-block"  v-model="groupPramas.groupName" placeholder="输入群名称" class="group-inpt" >
                        </a-input>
                    </div>
                    <div style="margin: 10px 0 10px;" >
                        <span class="title" >好友列表</span>
                    </div>
                    <div >
                        <a-input-search placeholder="请输入搜索内容" v-model='groupPramas.groupPerson' @search="getGroupPerson"  class="group-inpt"></a-input-search>
                    </div>
                    <div style="margin:20px 0;max-height:250px;overflow-y:auto;overflow-x:hidden;" ref="friendListContent">
                        <data-status :width="100" :hieght="330" class="stausPage-l" v-if="!craetGroupObj.chatUserList.length"></data-status>
                        <a-checkbox-group @change='choseGroupList' v-model="craetGroupObj.chatUserListChose" >
                            <div  v-for="(item,idx) in craetGroupObj.chatUserList" :key="idx" class="test">
                                <a-checkbox :value="item" :class="[item.in_room?'ant-checkbox-checked ant-checkbox-disabled':'']" :disabled="item.in_room?true:false">
                                    <img :src="item.avatar_url||item.header_img_url" alt="" style="width:32px;height:32px;display:inline-block;margin-right:10px;margin-bottom:3px;vertical-align: baseline">
                                    <span class="groupTitle" style="display: inline-block;width: calc(100% - 100px)">
                                        {{item.remark||item.nickname}}
                                        <span v-if="item.corp_name&&item.corp_name!=''" style="color:#FF9800">@{{item.corp_name}}</span>
                                    </span>

                                </a-checkbox>
                            </div>
                        </a-checkbox-group>
                    </div>
                </div>
                <div class="crear-content-right">
                    <div class="chosTitle">请勾选需要添加的联系人</div>
                    <div class="chatUserList" >
                        <div class="choseRightlist" v-for="(item,idx) in craetGroupObj.chatUserListChose" :key="idx" @click="dele(item)">
                            <img :src="item.avatar_url||item.header_img_url" alt="" style="margin-top:4px;width:32px;height:32px;display:inline-block;margin-right:10px;margin-bottom:3px;vertical-align: baseline">
                            <span class="groupTitle" style="display: inline-block;width: calc(100% - 100px)">
                                {{item.remark||item.nickname}}
                                <span v-if="item.corp_name&&item.corp_name!=''" style="color:#FF9800">@{{item.corp_name}}</span>
                            </span>
                            <a-icon type="close-circle" theme="filled" style="float:right;margin-top:12px;color:#ccc;" v-if="item.in_room!=1"></a-icon>
                        </div>
                    </div>
                </div>
                <div class="crear-content-bottom">
                    <a-button type="primary" @click="actionPerson(craetGroupObj.flg)">确定</a-button>
                    <a-button  @click="cancelGroupMoadl">取消</a-button>
                </div>
           </div>

        </a-modal>
        <a-modal :visible='fowardModal' :footer="null" width='660px' @cancel="cancelfowardModal">
            <div class="creatGpTitle">
                转发
            </div>
            <div class="creat-content">
                <div class="crear-content-left">
                    <div style="margin: 10px 0 10px;" >
                        <span class="title" >用户/群列表</span>
                    </div>
                    <div >
                        <a-input-search placeholder="请输入搜索内容" v-model='forwardUserKey'  @search="forwardSearch"  class="group-inpt"></a-input-search>
                    </div>
                    <div style="margin:20px 0;max-height:250px;overflow-y:auto;overflow-x:hidden;" ref="forwardListContent">
                        <!-- <data-status :width="100" :hieght="330" class="stausPage-l" v-if="!craetGroupObj.chatUserList.length"></data-status> -->
                        <a-checkbox-group @change='choseGroupList' v-model="forwardUserListChose" >
                            <div v-for="(item,idx) in forwardUserList" :key="idx">
                                <!--<a-checkbox :value="item" :class="[item.checked?'ant-checkbox-checked':'']">-->
                                <a-checkbox :value="item">
                                    <img v-if="item.chat_type==20" src="../../assets/room_avatar.png" alt="" style="width:32px;height:32px;display:inline-block;margin-right:10px;margin-bottom:3px;vertical-align: baseline">
                                    <img :src="item.avatar_url" v-else alt="" style="width:32px;height:32px;display:inline-block;margin-right:10px;margin-bottom:3px;vertical-align: baseline">
                                    <span  v-if="item.chat_type==20" class="groupTitle" style="display: inline-block;width: calc(100% - 100px)">{{item.name||'未命名的群'}}</span>
                                    <span v-else class="groupTitle" style="display: inline-block;width: calc(100% - 100px)">
                                        {{item.remark||item.name}}
                                        <span v-if="item.corp_name&&item.corp_name!=''" style="color:#FF9800">@{{item.corp_name}}</span>
                                    </span>
                                </a-checkbox>
                            </div>
                        </a-checkbox-group>
                    </div>
                </div>
                <div class="crear-content-right">
                    <div class="chosTitle">请勾选需要添加的联系人</div>
                    <div class="chatUserList" >
                        <div class="choseRightlist" v-for="(item,idx) in forwardUserListChose" :key="idx" @click="deleForward(item)">
                            <img v-if="item.chat_type==20" src="../../assets/room_avatar.png" alt="" style="margin-top:4px;width:32px;height:32px;display:inline-block;margin-right:10px;margin-bottom:3px;vertical-align: baseline">
                            <img :src="item.avatar_url" alt="" v-else style="margin-top:4px;width:32px;height:32px;display:inline-block;margin-right:10px;margin-bottom:3px;vertical-align: baseline">
                            <span  v-if="item.chat_type==20" class="groupTitle" style="display: inline-block;width: calc(100% - 100px)">{{item.name||'未命名的群'}}</span>
                            <span class="groupTitle" v-else style="display: inline-block;width: calc(100% - 100px)">
                                {{item.remark||item.name}}
                                <span v-if="item.corp_name&&item.corp_name!=''" style="color:#FF9800">@{{item.corp_name}}</span>
                            </span>
                            <a-icon type="close-circle" theme="filled" style="float:right;margin-top:12px;color:#ccc;"></a-icon>
                        </div>
                    </div>
                </div>
                <div class="crear-content-bottom">
                    <a-button type="primary"  @click="forward" >确定</a-button>
                    <a-button  @click="cancelfowardModal">取消</a-button>
                </div>
           </div>

        </a-modal>
        <a-modal :visible='liveChatCallFlag' title="选择拨号手机"  width='660px' @cancel="liveChatCallFlag = false"  @ok="liveChatSave"  class="cardModal">
            <div>
                <div style="height:30px;line-height:30px;margin-bottom:10px;">选择手机号：</div>
                <a-select v-model="robotTelIdx" @change='robotTelChange' style="width:100%">
                    <a-select-option v-for="(item,index) in robotTel" :key="index">
                        {{item.mobile_serial_name?item.mobile_serial_name:'无数据'}}
                    </a-select-option>
                </a-select>
                <div style="margin-top:20px;">
                    <a-radio-group  v-model="radioValue" @change="onChangeValue">
                        <a-radio :value="10" style="margin: 0 10px 20px 0;">
                            <img src="../../assets/card1.svg" v-if="radioValue===10" class="cardImg"/>
                            <img src="../../assets/card2.svg" v-else class="cardImg" />
                            <span :style="{color:radioValue===10?'#5AA9CD':'#ccc'}">卡一</span>
                        </a-radio>
                        <a-radio :value="20" style="margin-bottom: 20px;">
                            <img src="../../assets/card1.svg" v-if="radioValue===20" class="cardImg" />
                            <img src="../../assets/card2.svg" v-else class="cardImg"/>
                            <span :style="{color:radioValue===20?'#5AA9CD':'#ccc'}">卡二</span>
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
    import moment from 'moment';
    import contactItem from '../../components/customerChat/contactItem'
    import chatMsgItem from '../../components/customerChat/chatMsgItem'
    import divEditArea from '../../components/customerChat/divEditArea'
    import viewMaterial from'../../components/customerChat/viewMaterial'
    import buyRecordItem from '../../components/customerChat/buyRecordItem'
    import dataStatus from '../../components/pageConfig/dataStatus'
    import atRoomUser from '../../components/customerChat/atRoomUser'
    import EmjCommon from '../../components/tool/emjCommon';
    import { concatMsgArr } from '@/common/util'
    import { NiuniuCaptureObject,isMacintosh,rgb2value } from '../../common/niuniucapture.js'
    var emoji = require('../../common/emojiMap');
    var storage = require('../../common/store')
    var comConf = require('../../common/comConfig');
    export default {
        name: "",
        components: {contactItem,chatMsgItem,divEditArea,viewMaterial,buyRecordItem,dataStatus,atRoomUser,EmjCommon}
        ,data(){
            return{
                sendTextFlag:false,
                liveChatCallFlag:false,
                id:this.$route.query.id,
                radioValue:10,
                robotTelIdx:'0',
                robotTel:this.$store.state.user.user.robotTel,
                departmentID:this.$store.state.user.user.department.id,
                searchKey:'',
                liveChattel:'0',
                searchTab_key:'0',
                searchDataList:[],
                rightKey:'0',
                showRightFlg:false,
                emojiList:emoji.emojiList,
                pngFlag:require('../../assets/room_avatar.png'),
                fowardModal:false,
                fowardItem:null,
                fowardNum:'0',
                selectNum:[],
                selectNumflg:false,
                sendObj:{
                    text:'',
                    img_url:''
                },
                sendFile:{
                    name:'',
                    size:'',
                    file_url:''
                },
                headers:{
                    Authorization: storage.store.get('token')
                },
                tabNavList:[
                    {
                        id:1,
                        title:'个人信息',
                        icon:'contacts',
                        imgW:'static/img_file/right-nav1-w.png',
                        imgB:'static/img_file/right-nav1-b.png',
                    },
                    {
                        id:2,
                        title:'快捷回复',
                        icon:'message',
                        imgW:'static/img_file/right-nav2-w.png',
                        imgB:'static/img_file/right-nav2-b.png',
                    },
                    {
                        id:3,
                        title:'聊天记录',
                        icon:'clock-circle',
                        imgW:'static/img_file/right-nav3-w.png',
                        imgB:'static/img_file/right-nav3-b.png',
                    },
                    {
                        id:4,
                        title:'订单信息',
                        icon:'shopping-cart',
                        imgW:'static/img_file/right-nav4-w.png',
                        imgB:'static/img_file/right-nav4-b.png',
                    },
                    {
                        id:5,
                        title:'集聊朋友圈',
                        icon:'shopping-cart',
                        imgW:'static/img_file/friend-nav5-b.svg',
                        imgB:'static/img_file/friend-nav5-w.svg',
                    }
                ],
                range:null,
                sel:null,
                sendImgFlag:false,
                sendFileFlag:false,
                confirmLoading:false,
                contactInfo:{},
                contactLabel:[],
                allLabel:[],//当前部门所有标签
                selectTagFlag:false,
                fastReply:[],
                chatHistory:[],
                buyHistory:[],
                orderBindStatus:false,
                searchMaterialKey:'',
                contactLastId:0,
                chatMsgLastId:0,
                focus_blur:false,
                contactScrollFlag:false,  //联系人滚动加载控制
                chatMsgScrollFlag:false,  //对话框滚动加载控制
                chatHistoryScrollFlag:false,//聊天记录滚动加载控制
                friendsScrollFlag:false,
                chatHistoryLastId:0,
                searchChatList:[],//搜索模式下获得的数据
                searchKeyNum:1,//搜索是上一条，下一条，初始值为1
                showFlg:true,
                Flg:true,
                managerList:[],
                showHint:false,
                orderModal:false,
                orderDetail:{},
                goodsClass:[],
                goodsAll:[],
                selectMsgOrder:{},
                contactInfoEdit:false,
                contactWxInfoEdit:false,
                contactDescEdit:false,
                roomNoticeEdit:false,
                collocation_visible:false,
                replyList:[],
                welcomeList:[],
                welcome_own:[],
                auto_reply_own:[],
                previewVideo:false,
                videoPath:'',
                groupName:false,
                groupNickname:false,

                craetGroupObj:{
                    flg:'',
                    robotList:[],
                    groupMaster:true,
                    showName:true,
                    creatGroupMdal:false,
                    chatUserListAll:[],
                    chatUserList:[],
                    chatUserListChose:[],
                },
                groupPramas:{
                    robotIdx:'',
                    groupName:'',
                    groupPerson:'',
                    robotUsername:''
                },
                groupUserList:[{},{},{},{},{},{},
                {},{},{},{},{},{}],
                getMorFlg:false,
                morlist:10,
                searchIconHid:false,
                searchListCustomer:[],
                searchListTab:[],
                searchInfoFlg:false,
                searchListAll:[
                    {Contacts:[]},
                    {Group_chat:[]},
                    {Record:[]}
                ],
                atRoomUser:[],   //@群内成员列表
                atRoomUserStatus:false,   //是否需要搜索@群用户
                atTop:0,
                atLeft:0,
                atUser:[],
                atSearchKey:'',
                customIdx:'',
                groupIdx:'',
                histIdx:'',
                getMorlist:5,
                firendsList:[],
                emojiFlagOther:'',
                msgAtStatus:false,  //消息处@弹出层
                msgRetract:false,  //撤回弹出层
                liveChatAction:false,//右键操作弹出层
                forWardSelect:false,//选中状态
                askMsg:{},
                getFridtype:'0',
                textIdx:'',
                textIdxFlg:false,
                inputChinese:true,
                isClickRecord:false,
                lovelyFlg:'',
                msgFlag:false,
                msgFlagB:false,
                ask:{
                    text:''
                },
                askId:'',
                listCount:1,
                moreFriendCircleFlg:true,
                interimContactInfo:{},
                interimRoomInfo:{},
//              牛牛截图相关对象
                captureObj:null,
                downloadUrl:'http://www.ggniu.cn/download/CaptureInstall.exe?',

                isxflag:false,
                isxflagD:false,
                fileList:[],  //待上传文件列表
                showSendNotice:false,
                chatMsgLis:this.$store.state.liveChat.chatMsgList,
                editGroupFlag:'-1',
                moveGroupFlag:false, // 转移分组模态框
                createGroupFlag:false,  //新建、编辑、修改模态框
                groupCreatName:'',  //新建、编辑分组名
                groupCreatNameSave:'',//新建、编辑分组名(临时存储的，判断是否和之前的相同)
                iconFlag:false,
                gourpEdit:'',
                groupSelect:0,
                contactGroup:null,
                backUp:[],
                groupSelestList:[],
                slotId:0,
                liveChatTelIdx:0,
                robotIndex:0,
                userGroupList:[],//用户分组列表
                moveUserGroupList:[],
                groupColumns:[
                    {
                        title: '分组名称',
                        dataIndex: 'name',
                        align:'left',
                        scopedSlots: {
                            customRender: 'name'
                        },
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'left',
                        width:180,
                        scopedSlots: {
                            customRender: 'action'
                        },
                    },
                ],
                queryParam:{
                    platFormId:3,
                    bindType:'1',
                    key:''
                },
                platFormList:[],
                bindLoading:false,
                moreBuyHistoryFlag:false,
                buyPage:1,
                friendListScrollFlag:false, //新建群聊，添加群成员好友列表滚动控制
                friendListPage:1, //新建群聊，添加群成员好友列表分页
                sendMsgWarnStatus:'0',//0,正常状态，1触发了告警，此时可以点击发送，2触发了阻止
                SendNoticeMsg:'当前页面网络链接异常，请稍后再试',
                forwardUserKey:'',
                forwardUserListChose:[],
                forwardUserList:[],
                forwardListPage:1,
                forwardListScrollFlag:false,
                createRoomData:{}
            }
        }
        ,computed: {
            contactList () {
                return this.$store.state.liveChat.contactList
            },
            selectContact () {
                return this.$store.state.liveChat.selectContact
            },
            chatMsgList () {
                return this.$store.state.liveChat.chatMsgList
            },
            emojiFlag () {
                return this.$store.state.liveChat.emojiFlag
            },
            searchStatus() {
                return this.$store.state.liveChat.searchStatus
            },
            selectUser() {
                return this.$store.state.liveChat.selectUser
            },
            liveChatManage() {
                return this.$store.state.liveChat.liveChatManage
            },
            isHasDot() {
                return this.$store.state.liveChat.isHasDot
            },
            selectWx() {
                return this.$store.state.liveChat.selectWx
            },
            wxList() {
                return this.$store.state.liveChat.wxList
            },
            selectGroup() {
                return this.$store.state.liveChat.selectGroup
            },
        },
        watch:{
           liveChatAction:{
               handler(item){
                   this.clearMenu();
               }
           }
        },
        mounted () {
            let _this =this
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            setTimeout(()=>{
                if(this.$refs) {
                    console.log('mounted挂载scroll事件监听')
                    this.$refs.contactList&&this.$refs.contactList.addEventListener('scroll', () => {
                        if((this.$refs.contactList.scrollHeight - this.$refs.contactList.offsetHeight - this.$refs.contactList.scrollTop)< 50 && !this.contactScrollFlag ) {
                            this.getContactList(false,'2')
                        }
                    }, false)
                    this.$refs.chatContent&&this.$refs.chatContent.addEventListener('scroll', () => {
                        if(this.$refs.chatContent.scrollTop== 0 && !this.chatMsgScrollFlag && !!this.selectContact.id) {
                            !this.searchStatus&&this.getChatList(false,true)
                            this.searchStatus&&this.getSearchChatList(false,0)
                        } else if((this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight - this.$refs.chatContent.scrollTop)< 50 && !this.chatMsgScrollFlag && this.searchStatus){
                            this.getSearchChatList(false,1)
                        }
                    }, false)
                    this.$refs.chatHistoryContent&&this.$refs.chatHistoryContent.addEventListener('scroll', () => {
                        if(this.$refs.chatHistoryContent.scrollTop== 0 && !this.chatHistoryScrollFlag &&this.rightKey==2) {
                            this.getChatHistory(false,true)
                        }
                    }, false)
                }else {
                    console.log('$refs对象为找到，scroll事件监听失败')
                }
            },2000)
            this.globalClick(this.closeEmoji);
            this.clearMenu();
            this.initCapture()
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            moment,
            clearMenu(){
                let _this =this
                document.getElementById('liveChatContent').onclick = (e)=> {
                    let flag =false,flag1 = false,flag2 = false,flag3 = false
                    e.path.forEach(el=>{
                        if(el.id=='atRoomUser') {
                            flag = true
                        }
                    })
                    e.path.forEach(el=>{
                        if(el.id=='msgAt') {
                            flag1 = true
                        }
                    })
                    e.path.forEach(el=>{
                        if(el.id=='msgRetract') {
                            flag2 = true
                        }
                    })
                    e.path.forEach(el=>{
                        if(el.id=='liveChatAction') {
                            flag3 = true
                        }
                    })
                    !flag&&(_this.atRoomUserStatus = false)
                    //!flag1&&(_this.msgAtStatus = false)
                    !flag2&&(_this.msgRetract = false)
                    !flag3&&(_this.liveChatAction = false)
                };
            },
            material(item){
                this.svaeMaterial(item,true);
            },
            svaeMaterial(item,bool){
                //多选保存素材
                let data = {}
                let type = []
                let content = []
                let appid = []
                let alias = []
                let orginid = []
                let title = []
                let desc = []
                let url = []
                let iconurl = []
                let mediapath = []
                let typeNum = item.type == '1'? 1 : (item.type == '3'||item.type == '47')?2:item.type == '5'?3:item.type == '42'?7:item.type == '33'?8:item.type == '6'?10:item.type == '43'?11:''
                if(item&&bool){
                    data = {
                        department_id:this.$store.state.user.user.department.id,
                        type:[typeNum],
                        content:[emoji.htmlToString(item.content||'')],
                        appid:[item.appid||''],
                        alias:[item.alias||''],
                        orginid:[item.orginid||''],
                        title:[item.title||''],
                        desc:[item.desc||''],
                        url:[item.url||''],
                        iconurl:[ item.bigImg || item.iconurl ||''],
                        mediapath:[item.mediapath||''],
                        ecms_userid:this.$store.state.user.user.user_id
                    }
                }else{
                    //el.data.type === '6'?10:el.data.type === '43'?11:  //6是文件 43是视频 暂时不支持保存
                    this.selectNum.forEach(el=>{
                        type.push(el.data.type === '1'? 1 :el.data.type === '3'?2:(el.data.type === '5'||el.data.type === '47')?3:el.data.type === '42'?7:el.data.type === '33'?8:'')
                        content.push(emoji.htmlToString(el.data.content ||''))
                        appid.push(el.data.appid ||'')
                        alias.push(el.data.alias ||'')
                        orginid.push(el.data.orginid ||'')
                        title.push(el.data.title ||'')
                        desc.push(el.data.desc ||'')
                        url.push(el.data.url ||'')
                        iconurl.push(el.bigImg || el.data.iconurl ||'')
                        mediapath.push(el.data.mediapath ||'')
                    })
                    data = {
                        department_id:this.$store.state.user.user.department.id,
                        type:type,
                        content:content,
                        appid:appid,
                        alias:alias,
                        orginid:orginid,
                        title:title,
                        desc:desc,
                        url:url,
                        iconurl:iconurl,
                        mediapath:mediapath,
                        ecms_userid:this.$store.state.user.user.user_id
                    }
                }
                this.$axios({
                    method:'POST',
//                    url:'/index.php?r=uc/material/add-material',
                    url:'/ecmsapi/addmaterial?',
                    data:data
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        this.liveChatAction = false
                        this.forWardSelect = false;
                        this.selectNum = [];
                        this.selectNum  = []
                        this.$refs["chatMsgItem"].forEach(el=>{
                            el.clearCheck()
                        })
                        this.selectNumflg = false
                        this.$message.success('保存成功')
                    }else {
                        this.liveChatAction = false
                        this.forWardSelect = false;
                        this.selectNum = [];
                        this.selectNum  = []
                        this.$refs["chatMsgItem"].forEach(el=>{
                            el.clearCheck()
                        })
                        this.selectNumflg = false
                    }
                })
            },
            upSort(idx){
                this.contactList.forEach((el,index)=>{
                    if(idx === index){
                        this.contactList.splice(idx,1);
                        this.contactList.splice(--idx,0,el)
                    }
                })
                this.sortSave()
            },
            downSort(idx){
                let context = null;
                this.contactList.forEach((el,index)=>{
                    if(idx === index){
                        this.contactList.splice(idx,1);
                        context = el
                    }
                })
                this.contactList.splice(++idx,0,context)
                this.sortSave();
            },
            sortSave(){
                let idArray = []
                this.contactList.forEach(el=>{
                    idArray.push(el.group_id)
                })
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/sort-friends-group',
                    data:{
                        id:idArray
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        // this.getContactList(true,'0')
                    }
                })
            },
            fold(item){
                this.$set(item,'flg',!item.flg)
            },
            closeGroup(){
                this.moveGroupFlag = false;
            },
            moveGroup(val){
                this.groupSelect = val
            },
            moveGroupFn(val,item){
                let data = {}
                if(val==='1'){
                    data = {
                        id:this.contactGroup.id,
                        chat_type:this.contactGroup.chat_type,
                        type:'1',
                        group_id:this.groupSelect,
                        wx_type:this.selectWx.wx_type
                    }
                }else if(val === '2'){
                    data = {
                        id:item.id,
                        chat_type:item.chat_type,
                        type:'2',
                        wx_type:this.selectWx.wx_type
                    }
                }else{
                    data = {
                        id:item.id,
                        chat_type:item.chat_type,
                        type:'3',
                        wx_type:this.selectWx.wx_type
                    }
                }
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/operate-friends-group',
                    data:data
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        let num = 0
                        this.wxList.forEach(el=>{
                            if(el.username==this.selectWx.username) {
                                num = el.num
                            }
                        })
                        this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:num})
                        this.$store.commit('liveChat/clearWxListNum',this.selectWx)
                        this.$message.success(udata.msg)
                        this.moveGroupFlag = false;
                        this.contactScrollFlag = false;
                        this.getContactList(true,'0')
                    }
                })
            },
            handleGroupOk(val,item,index){
                let data = {}
                let flag = false
                switch (val)  {
                    case '1':
//                        编辑
                        if(this.checkGroupIsEdit()) {
                            this.groupCreatName = item.name
                            this.groupCreatNameSave = item.name
                            this.$set(item,'editStatus',true)
                        }
                        break
                    case '2':
//                        保存
                        flag = true
                        if(item.id!='') {
                            if(this.groupCreatNameSave == this.groupCreatName) {
                                flag = false
                                this.groupCreatName = ''
                                this.groupCreatNameSave = ''
                                this.$set(item,'editStatus',false)
                                break
                            }
                            data = {
                                action:'update',
                                user_id:this.selectUser.id,
                                name:this.groupCreatName,
                                id:item.id
                            }
                        }else {
                            data = {
                                action:'create',
                                user_id:this.selectUser.id,
                                name:this.groupCreatName
                            }
                        }
                        break
                    case '3':
//                        删除
                        flag = true
                        this.groupCreatName = item.name
                        data = {
                            action:'delete',
                            user_id:this.selectUser.id,
                            name:item.name,
                            id:item.id
                        }
                        break
                    case '4':
//                        取消
                        this.groupCreatName = ''
                        this.groupCreatNameSave = ''
                        this.$set(item,'editStatus',false)
                        this.$forceUpdate()
                        if(item.id=='') {
                            this.moveUserGroupList.splice(index,1)
                        }
                        break
                }
                flag&&this.groupCreatName!=''&&this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/deal-friends-group',
                    data:data
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        this.$message.success(udata.msg)
                        this.groupCreatName = '';
                        this.groupCreatNameSave = ''
                        this.getMoveUserGroupList()
                    }
                })
            },
            editGroupName(item,bool){
                this.gourpEdit = item.group_name;
                this.$set(item,'editFlg',!item.editFlg)
                if(bool){
                    this.gourpEdit = '';
                    this.getContactList(true,'0')
                }
            },
            telChange(val){
                this.tel = val;
                this.liveChatTelIdx = val
            },
            liveChatCall(){
                this.liveChatCallFlag = true;
                console.log(this.$store.state.user.user.robotTel)
                this.robotTelIdx = this.$store.state.user.user.robotTel.length?this.$store.state.user.user.robotTel[0].mobile_serial_name:'无匹配结果';
            },
            onChangeValue(e){
                // value=20 卡二 value=10 卡一
                if(e.target.value===20){
                    this.slotId = 1
                }else{
                    this.slotId = 0
                }
            },
            liveChatSave(e){
                //拨打电话
                if(!this.$store.state.user.user.robotTel.length){
                    this.$message.warn('未绑定设备，拨打受限!')
                    return false
                }
                let data = {
                    cmd:2065,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.$store.state.user.user.robotTel[this.robotIndex].username,
                    cmdData:{
                        number:this.contactInfo.tel_arr_true[this.liveChatTelIdx],
                        slotId:this.slotId
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2065 = msg =>{
                    if(msg.status === 3){
                        this.$message.success(msg.callbackMsg)
                        this.liveChatCallFlag = false;
                    }else{
                        this.$message.success(msg.callbackMsg)
                    }
                }
            },
            robotTelChange(val){
                this.robotIndex = val
            },
            dragover(e){
                console.log('1')
                e.preventDefault();
                e.stopPropagation();
                this.isxflagD = !this.isxflagD;
            },
            dragente(e){
                console.log('2')
                e.preventDefault();
                e.stopPropagation();
                this.isxflagD = !this.isxflagD
            },
            drgleave(e){
                e.preventDefault();  //阻止拖入时的浏览器默认行为
                e.stopPropagation();
                this.isxflagD = !this.isxflagD
            },
            leave(){
                console.log('leave')
                this.isxflag?this.isxflag = !this.isxflag:this.isxflag
                this.isxflagD?this.isxflagD = !this.isxflagD:this.isxflagD
            },
            getisflag(e){

                this.isxflag = e
            },

            removeFile(index) {
                this.fileList.splice(index,1)
            },
            getTextAll(index){
                this.textIdx = index;
                this.textIdxFlg = !this.textIdxFlg;
            },
            changeListAll(items,indx){
                this.lovelyFlg = indx;
                this.msgFlag = !this.msgFlag;
                items.albumList.length>24?this.msgFlagB = !this.msgFlagB:this.msgFlagB
            },
            searchMsgInfo(){
                this.searchInfoFlg = true;
                this.searchIconHid = true;
            },
            searchhidInfo(){
                if(this.searchKey === ''){
                    this.searchTab_key = '0';
                    this.searchIconHid = false;
                    this.searchInfoFlg = false;
                }

            },
            getSearchMor(idx){
                idx===0?this.searchTab_key = '1':idx===1?this.searchTab_key='2':idx===2?this.searchTab_key='3':'0';
                this.serchListContent()
            },
            creatCustomerGroup(){
                if(!this.selectWx.id) {
                    return
                }
                this.createGroupFlag = true;
                this.getMoveUserGroupList()
            },
            creatGroup(item){
                this.friendListPage = 1
//                let data = {}
                if(!item){
                    this.craetGroupObj.flg = '创建群聊'
                    this.craetGroupObj.showName = true;
                    this.craetGroupObj.groupMaster = false;
                    this.createRoomData = {
                        aid:this.selectWx.id,
                        roomId:'0',
                        type:'0'
                    }
                    this.handlerobotChange(this.selectWx.id,'0','0')

//                    this.getRobotList()
                }else if(item ==='action-add'){
                    data = {
                        aid:this.selectContact.robot_id,
                        roomId:this.contactInfo.id,
                        type:'0'
                    }
                    this.handlerobotChange(this.selectContact.robot_id,this.contactInfo.id)
                    this.craetGroupObj.flg = '添加成员'
                    this.craetGroupObj.showName = false;
                    this.craetGroupObj.groupMaster = false;
                }else if(item ==='action-delt'){
//                  需要调接口拿全部群成员
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/communication/room-member-list',
                        data:{
                            room_id:this.selectContact.id,
                            keyword:null,
                            page:'1',
                            size:'500',
                            type:'1'
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.craetGroupObj.chatUserListAll = udata.data;
                            this.craetGroupObj.chatUserList =  udata.data;
                            this.craetGroupObj.flg = '删除成员'
                            this.craetGroupObj.flgBtn = '删除'
                            this.craetGroupObj.showName = false;
                            this.craetGroupObj.groupMaster = false;
                        }
                    });
                }else{
                    this.createRoomData = {
                        aid:this.selectContact.robot_id,
                        roomId:'0',
                        type:'1'
                    }
                    this.handlerobotChange(this.selectContact.robot_id,'0','1')
                    this.craetGroupObj.flg = '创建群聊'
                    this.craetGroupObj.showName = true;
                    this.craetGroupObj.groupMaster = false;
                }
                this.craetGroupObj.creatGroupMdal = true;
                setTimeout(_=>{
                    this.$refs.friendListContent.addEventListener('scroll', () => {
                        if((this.$refs.friendListContent.scrollHeight - this.$refs.friendListContent.offsetHeight - this.$refs.friendListContent.scrollTop)< 10
                            && !this.friendListScrollFlag && (this.craetGroupObj.flg == '创建群聊'|| this.craetGroupObj.flg == '添加成员')) {
                            this.getMoreFriendList()
                        }
                    }, false)
                },0)
            },
            getRobotList(){
                let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot',
					data: Object.assign({}, {
                        'user_id':this.selectUser,
						'department_id': this.departmentID
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
                    var udata = d.data;
					if(udata.status == 1) {
                        that.craetGroupObj.robotList = d.data.data.robotList;
                        that.groupPramas.robotIdx = d.data.data.robotList[0].id;
                        that.groupPramas.robotUsername = d.data.data.robotList[0].username;
                        that.handlerobotChange(that.groupPramas.robotIdx)
                    }
				});
            },
            handlerobotChange(aid,roomId,type){
                this.craetGroupObj.robotList.forEach(el=>{
                    if(el.id == aid) {
                        this.groupPramas.robotUsername = el.username
                    }
                })
                let that = this;
                let data = {
                    aid:aid,
                    p:this.friendListPage,
                    n:20,
                    key:this.groupPramas.groupPerson
                }

                if(typeof (roomId)=='string'&&roomId!='0') {
                    data.room_id = roomId
                    if(this.selectContact.friend_user_name.search(/@im.chatroom/)!=(-1)) {
                        data.wx_type='20'
                    }else {
                        data.wx_type='10'
                    }
                }
                this.friendListScrollFlag = false
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/assistant-friend-list',
                    data:data
                }).then(function(d){
                    var udata = d.data;
                    if(udata.status === 1){
                        that.craetGroupObj.chatUserListAll = udata.data;
                        that.craetGroupObj.chatUserList =  udata.data;
                        that.craetGroupObj.chatUserListChose = []
                        if(roomId=='0') {
                            if(type=='1') {
                                that.craetGroupObj.chatUserList.forEach(el=>{
                                    if(el.username==that.selectContact.friend_user_name) {
                                        el.in_room = 1
//                                        that.craetGroupObj.chatUserListChose[0] = el
                                    }
                                })
                                that.craetGroupObj.chatUserListChose[0] = {
                                    id: that.selectContact.id,
                                    nickname: that.selectContact.nickname,
                                    username: that.selectContact.friend_user_name,
                                    avatar_url:that.selectContact.avatar_url,
                                    remark: that.selectContact.remark,
                                    corp_name: that.selectContact.corp_name,
                                    in_room:1
                                }
                            }
                            that.groupPramas.robotUsername = that.selectWx.username
                        }
                    }
                })
            },
            handlerobotChange1(aid,roomId,type){
                this.craetGroupObj.robotList.forEach(el=>{
                    if(el.id == aid) {
                        this.groupPramas.robotUsername = el.username
                    }
                })
                let that = this;
                let data = {
                    aid:aid,
                    p:this.friendListPage,
                    n:20,
                    key:this.groupPramas.groupPerson
                }
                if(typeof (roomId)=='string'&&roomId!='0') {
                    data.room_id = roomId
                    if(this.selectContact.friend_user_name.search(/@im.chatroom/)!=(-1)) {
                        data.wx_type='20'
                    }else {
                        data.wx_type='10'
                    }
                }
                this.friendListScrollFlag = false
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/assistant-friend-list',
                    data:data
                }).then(d=>{
                    var udata = d.data;
                    if(udata.status === 1){
                        that.craetGroupObj.chatUserList =  udata.data;
                        if(roomId=='0') {
                            if(that.createRoomData.type=='1') {
                                that.craetGroupObj.chatUserList.forEach(el=>{
                                    if(el.username==that.selectContact.friend_user_name) {
                                        el.in_room = 1
//                                        that.craetGroupObj.chatUserListChose[0] = el
                                    }
                                })
//                                that.craetGroupObj.chatUserListChose[0] = {
//                                    id: that.selectContact.id,
//                                    nickname: that.selectContact.nickname,
//                                    username: that.selectContact.friend_user_name,
//                                    avatar_url:that.selectContact.avatar_url,
//                                    remark: that.selectContact.remark,
//                                    corp_name: that.selectContact.corp_name,
//                                    in_room:1
//                                }
                            }
                            that.groupPramas.robotUsername = that.selectWx.username
                        }
                    }
                })
            },
            getMoreFriendList() {
                let data = this.createRoomData
                let that = this
                if(this.friendListScrollFlag) {
                    return
                }
                this.friendListScrollFlag = true
                this.friendListPage +=1
                let params = {
                    aid:data.aid,
                    p:this.friendListPage,
                    n:20,
                    key:this.groupPramas.groupPerson
                }
                if(typeof (data.roomId)=='string'&&data.roomId!='0') {
                    params.room_id = data.roomId
                    if(this.selectContact.friend_user_name.search(/@im.chatroom/)!=(-1)) {
                        params.wx_type='20'
                    }else {
                        params.wx_type='10'
                    }
                }
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/assistant-friend-list',
                    data:params
                }).then(function(d){
                    var udata = d.data;
                    if(udata.status === 1){
                        if(udata.data.length == 0) {
                            setTimeout(()=>{
                                that.friendListScrollFlag = true
                            },0)
                            return
                        }
                        that.craetGroupObj.chatUserListAll = that.craetGroupObj.chatUserListAll.concat(udata.data);
                        that.craetGroupObj.chatUserList =  that.craetGroupObj.chatUserList.concat(udata.data);
                        if(data.roomId=='0'&&data.type=='1') {
                            udata.data.forEach(el=>{
                                if(el.username==that.selectContact.friend_user_name) {
                                    el.in_room = 1
//                                    that.craetGroupObj.chatUserListChose.push(el)
                                }
                            })
                        }
                        setTimeout(()=>{
                            that.friendListScrollFlag = false
                        },0)
                    }
                })
            },
            getGroupPerson() {
                this.friendListPage = 1
                this.friendListScrollFlag = false
                if(this.craetGroupObj.flg =='创建群聊') {
                    this.handlerobotChange1(this.selectWx.id,'0','0')
                }else if(this.craetGroupObj.flg =='添加成员') {
                    this.handlerobotChange1(this.selectContact.robot_id,this.contactInfo.id)
                }
//                else if(this.craetGroupObj.flg =='创建群聊1') {
//                    this.handlerobotChange(this.selectContact.robot_id,'0','1')
//                }
                else {
                    if(this.groupPramas.groupPerson){
                        this.craetGroupObj.chatUserList = []
                        this.craetGroupObj.chatUserListAll.forEach(el=>{
                            if(el.nickname.indexOf(this.groupPramas.groupPerson) != -1){
                                this.craetGroupObj.chatUserList.push(el)
                            }
                        })
                    }else{
                        this.craetGroupObj.chatUserList = this.craetGroupObj.chatUserListAll
                    }
                }
            },
            cancelGroupMoadl(){
                this.groupPramas = {
                    robotIdx:'',
                    groupName:'',
                    groupPerson:'',
                    robotUsername:''
                }
                this.craetGroupObj.chatUserListChose = [];
                this.craetGroupObj.chatUserListAll = [];
                this.craetGroupObj.chatUserList = [];
                this.craetGroupObj.creatGroupMdal = !this.craetGroupObj.creatGroupMdal;
            },
            forwardSearch(){
                this.forwardListPage = 1
                this.forwardListScrollFlag = false
                this.$refs.forwardListContent.scrollTop = 0
                this.getForwardList(false)
            },
            getForwardList(bool) {
                this.$axios({
                    method:'post',
                    url:'/index.php?r=uc/communication/get-friend-room',
                    data:{
                        robot_username:this.selectWx.username,
                        p:this.forwardListPage,
                        n:20,
                        key:this.forwardUserKey,
                        wx_type:this.selectWx.wx_type
                    }
                }).then(d=>{
                    var udata = d.data;
                    if(udata.status === 1){
                        this.forwardUserList =  udata.data.list;
                        bool&&(this.forwardUserListChose = [])
//                        this.forwardUserList.forEach(el=>{
//                            this.forwardUserListChose.forEach(item=>{
//                                if(el.username==item.username) {
//                                    el.checked = true
//                                }
//                            })
//                        })
                        this.$forceUpdate()
                    }
                })
            },
            getMoreForwardList() {
                let that = this
                if(this.forwardListScrollFlag) {
                    return
                }
                this.forwardListScrollFlag = true
                this.forwardListPage +=1
                this.$axios({
                    method:'post',
                    url:'/index.php?r=uc/communication/get-friend-room',
                    data:{
                        robot_username:this.selectWx.username,
                        p:this.forwardListPage,
                        n:20,
                        key:this.forwardUserKey,
                        wx_type:this.selectWx.wx_type
                    }
                }).then(d=>{
                    var udata = d.data;
                    if(udata.status === 1){
                        if(udata.data.list.length == 0) {
                            setTimeout(()=>{
                                that.forwardListScrollFlag = true
                            },0)
                            return
                        }
                        this.forwardUserList =  this.forwardUserList.concat(udata.data.list);
//                        this.forwardUserList.forEach(el=>{
//                            this.forwardUserListChose.forEach(item=>{
//                                if(el.username==item.username) {
//                                    el.checked = true
//                                }
//                            })
//                        })
                        this.$forceUpdate()
                        setTimeout(()=>{
                            that.forwardListScrollFlag = false
                        },0)
                    }
                })
            },
            choseGroupList(item){
                console.log(item)
                this.forwardUserListChose = comConf.arrayUnique(this.forwardUserListChose,'username')
//                this.forwardUserList.forEach(el=>{
//                    let flag = false
//                    this.forwardUserListChose.forEach(item=>{
//                        if(el.username==item.username) {
//                            flag  = true
//                        }
//                    })
//                    if(flag) {
//                        el.checked = true
//                    }else {
//                        el.checked = false
//                    }
//                })
                this.$forceUpdate()
            },
            actionPerson(val){
                var obj = {
                    userArray:[]
                }
                var userArray = [];
                let data;
                if(val === '创建群聊'){
                    if(this.craetGroupObj.chatUserListChose.length<2){
                        this.$message.warning('选择好友数不少于2个！')
                        return false
                    }
                    obj.roomName = this.groupPramas.groupName;
                    obj.userName = this.groupPramas.robotUsername;
                    this.craetGroupObj.chatUserListChose.forEach(el=>{
                        obj.userArray.push(el.username)
                    })
                    data = {
                        cmd:2014,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.groupPramas.robotUsername,
                        cmdData:{
                            friendUsernameList:obj.userArray
                        }
                    }
                    this.$ws.cmd2014 = msg=>{
                        if(msg.status==2&&!!msg.cmdData.username) {
                            let data2018 = {
                                cmd:2018,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.groupPramas.robotUsername,
                                cmdData:{
                                    nickname:this.groupPramas.groupName,
                                    username :msg.cmdData.username,
                                }
                            }
                            let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                            let data2003 = {
                                cmd:2003,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.groupPramas.robotUsername,
                                cmdData:{
                                    toUser:msg.cmdData.username,
                                    content:'邀请您加入了群聊' ,
                                },
                                pageKey:pageKey
                            }
                            comConf.isOfflineRobot(this.groupPramas.robotUsername,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                            setTimeout(_=>{
                                this.groupPramas.groupName!=''&&this.$ws.sendMsgFun(data2018)
                            },10000)
                            setTimeout(_=>{
                                this.$ws.sendMsgFun(data2003)
                            },20000)
                            this.$ws.cmd2014 = null
                        }else if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                }else if(val === '添加成员'){
                    if(this.craetGroupObj.chatUserListChose.length==0){
                        this.$message.warning('请选择好友！')
                        return false
                    }
                    this.craetGroupObj.chatUserListChose.forEach(el=>{
                        obj.userArray.push(el.username)
                    })
                    data = {
                        cmd:2016,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:{
                            username:this.selectContact.friend_user_name,
                            memberIds:obj.userArray
                        }
                    }
                    this.$ws.cmd2016=msg=>{
                        if(msg.status==2) {
                            setTimeout(_=>{
                                this.getmoreList()
                            },8000)
                        }else if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                }else{
                    if(this.craetGroupObj.chatUserListChose.length==0){
                        this.$message.warning('请选择好友！')
                        return false
                    }
                    this.craetGroupObj.chatUserListChose.forEach(el=>{
                        obj.userArray.push(el.username)
                    })
                    data = {
                        cmd:2015,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:{
                            username:this.selectContact.friend_user_name,
                            memberIds:obj.userArray
                        }
                    }
                    this.$ws.cmd2015=msg=>{
                        if(msg.status==2) {
                            setTimeout(_=>{
                                this.getmoreList()
                            },8000)
                        }else if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                }
                comConf.isOfflineRobot(this.groupPramas.robotUsername,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.craetGroupObj.chatUserListChose = [];
                this.craetGroupObj.creatGroupMdal = !this.craetGroupObj.creatGroupMdal ;
            },
            replyMsg(index,info){//朋友圈回复评论
                this.askId = index;
                this.ask.text =''
                this.ask.content = info
                this.$refs.emjCommon[index].changePlaceholder(info)
            },
            getMsg(msg){
                console.log(msg)
               this.askMsg = msg;

               if(!msg.text){
                   this.ask={}
               }
            },
            sendAskMsg(item,index){
                if(this.askMsg === null){
                    this.$message.warning('不能发送空白评论')
                    return
                }
                if(this.askMsg.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
                    this.$message.warning('不能发送空白评论')
                    return
                }
                comConf.isOfflineRobot(item.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = null
                if(this.askMsg.content=== undefined ||this.askMsg.content.id === item.id){
                    data = {
                        cmd:2050,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:item.robot_username,
                        cmdData:{
                            snsId:item.snsId,
                            type:2,
                            comment:this.askMsg.text,
                        },
                        priority:0
                    }
                    item.commentList.push({comment: this.askMsg.text,avatar_url: this.selectContact.robot_avatar_url,nickname:this.selectContact.robot_nickname,comment_time:this.formData(new Date())})
                    console.log(  item.commentList)
                }else{
                    data = {
                        cmd:2050,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:item.robot_username,
                        cmdData:{
                            snsId:item.snsId,
                            type:2,
                            comment:this.askMsg.text,
                            toComment:{
                                timestamp:this.askMsg.content.timestamp,
                                username:this.askMsg.content.username,
                                nickname:this.askMsg.content.nickname,
                                id:this.askMsg.content.wx_comment_id
                            }
                        },
                        priority:0
                    }
                    console.log(this.askMsg)
                    item.commentList.push({comment: this.askMsg.text,avatar_url: this.selectContact.robot_avatar_url,tonickname:this.askMsg.content.nickname,nickname:this.selectContact.robot_nickname,comment_time:this.formData(new Date())})
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }
                this.$refs.emjCommon[index].changePlaceholder('')
                this.askMsg.text  = ''
            },
            formData(date){
                 var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                var second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            lovely(item){
                console.log(item)
                if(item.is_like==1) {
                    // item.is_like = '0'
                    this.$message.info('已经点赞，无法再次点赞')
                    return
                }
                item.is_like = 1
                let _this = this;
                comConf.isOfflineRobot(item.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.robot_username,
                    cmdData:{
                        snsId:item.snsId,
                        type:1
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==2) {
                        this.$message.success('点赞成功', 2);
                    }else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }

            },
            dele(val){
                if(val.in_room==1) {
                    return
                }
                this.craetGroupObj.chatUserListChose.splice(this.craetGroupObj.chatUserListChose.indexOf(val),1)
            },
            right(){
                this.showRightFlg = !this.showRightFlg;
                this.showFlg = !this.showFlg;
            },
            changeUser(item) {
                console.log(item) //    切换客户经理
                this.emitEmpty();
                this.$store.commit('liveChat/setSelectUser',item)
                let num = 0
                this.wxList.forEach(el=>{
                    num+=el.num
                })
                this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:num})
                this.$store.commit('liveChat/setSelectContact',{})
                this.$store.commit('liveChat/clearContactList')
                this.$store.commit('liveChat/clearChatMsgList')
                this.getWxList()
            },
            getLiveList(item,type){
                this.emitEmpty();
                this.$store.commit('liveChat/setSelectWx',item)
                this.$store.commit('liveChat/setSelectContact',{})
                this.$store.commit('liveChat/clearContactList')
                this.$store.commit('liveChat/clearChatMsgList')
                this.$store.commit('liveChat/setSelectGroup',{id:'0',name:'全部'})
                this.getUserGroupList()
                let num = 0
                this.wxList.forEach(el=>{
                    if(el.username==item.username) {
                        num = el.num
                    }
                })
                this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:num})
                this.$store.commit('liveChat/clearWxListNum',item)
                this.contactScrollFlag = false
                this.chatMsgScrollFlag = true
                if(type) {
                    this.getContactList(true,'0')
                }else {
                    this.getContactList(true,'1')
                }
            },
            emitEmpty() {
                this.searchChatList = []
                this.searchKey = ''
                this.searchInfoFlg = false;
                this.searchIconHid = false;
                this.$store.commit('liveChat/setSearchStatus',false)
                this.searchTab_key = '0';
                this.searchListAll[0].Contacts=[];
                this.searchListAll[1].Group_chat=[];
                this.searchListAll[2].Record=[];
                this.customIdx='';
                this.groupIdx='';
                this.histIdx='';
                if(this.isClickRecord) {
                    this.isClickRecord = false
                    let data = null
                    if(this.selectContact.chat_type==10) {
                        data = {
                            friends_id:this.selectContact.id,
                            department_id:this.$store.state.user.user.department.id,
                            wx_type:this.selectWx.wx_type
                        }
                    } else if(this.selectContact.chat_type==20) {
                        data = {
                            room_id:this.selectContact.id,
                            department_id:this.$store.state.user.user.department.id,
                            username:this.selectContact.room_username,
                            wx_type:this.selectWx.wx_type
                        }
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/communication/talk-now', //newFunction
                        data:data
                    }).then(res=>{
                        let udata = res.data
                        if (udata.status == 1) {
                            if(!!udata.data) {
                                !!udata.data.content&&(udata.data.content = emoji.stringToHtml(udata.data.content));
                                this.$store.commit('liveChat/insertContactList',udata.data);
                                this.chatMsgLastId = 0;
                                this.onSelect(udata.data,true)
                            }
                        }
                    })
                }
            },
            tabChange(key) {
                this.rightKey === key?this.showFlg = !this.showFlg:this.showFlg = true;
                this.rightKey = key
                if(!this.selectContact.id) {
                    return
                }
                switch (this.rightKey) {
                    case 0:
                        break
                    case 1:
                        this.getFastReply()
                        break
                    case 2:
                        this.chatHistoryScrollFlag = false
                        this.getChatHistory(true)
                        break
                    case 3:
                        this.orderBindStatus = false
                        this.buyPage = 1
                        this.getPlatForm()
                        this.getBuyHistory('0')
                        break
                    case 4:
                        this.chatHistoryScrollFlag = false;
                        this.firendsList = [];
                        this.listCount = 1;
                        this.moreFriendCircleFlg = true
                        this.getFriendsLife(true)
                }
            },
            tabKeychange(val){
                this.searchTab_key = val;
                this.searchListCustomer = [];
                if(this.searchKey=='') {
                    return
                }
                this.serchListContent()
            },
            searchContact(bool) {
                if(this.searchKey==''){
                    return
                }
                if(bool) {
                    this.serchListContent();
                }else if(!bool&&this.inputChinese) {
                    this.serchListContent();
                }
            },
            searchContext(contact,indx,val){
                val===1?this.customIdx = indx:val===2?this.groupIdx = indx:this.histIdx = indx;
                if(val==1||val==2) {
                    let data ={}
                    if(val==1) {
                        data = {
                            friends_id:contact.id,
                            department_id:this.$store.state.user.user.department.id,
                            wx_type:this.selectWx.wx_type
                        }
                    } else if(val==2) {
                        data = {
                            room_id:contact.id,
                            department_id:this.$store.state.user.user.department.id,
                            username:contact.room_username,
                            wx_type:this.selectWx.wx_type
                        }
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/communication/talk-now',
                        data:data
                    }).then(res=>{
                        let udata = res.data
                        if (udata.status == 1) {
                            console.log(udata)
                            if(!!udata.data) {
                                this.emitEmpty()
                                !!udata.data.content&&(udata.data.content = emoji.stringToHtml(udata.data.content));
                                this.$store.commit('liveChat/insertContactList',udata.data);
                                this.onSelect(udata.data,true)
                            }
                        }
                    })
                }else {
                    this.isClickRecord = true
                    this.rightKey = '0'
                    this.searchChatList = []
                    this.$store.commit('liveChat/setSelectContact',contact)
                    this.$store.commit('liveChat/clearChatMsgList')
                    this.selectContact.id = contact.chat_type==20?contact.room_id:contact.id;
                    this.selectContact.friend_user_name = contact.chat_type==20?contact.room_username:contact.username
                    contact.chat_type === '20'&&this.selectWx.wx_type=='10'?this.getmoreList():'';
                    this.chatMsgLastId = 0
                    this.chatMsgScrollFlag = false
                    this.searchKeyNum = 1
                    this.tabNavList[0].title = this.selectContact.chat_type=='10'?'个人信息':'群信息'
                    this.$store.commit('liveChat/setSearchStatus',true)
                    this.getContactInfo()
                    this.getSearchChatList(true)
                }
            },
            serchListContent(){
                let that = this;
                console.log(this.selectContact)
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/talk-condition',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        searchKeyType:this.searchTab_key,
                        searchKey:this.searchKey,
                        user_id:this.selectUser.id,
                        assistant_id:this.selectWx.id,
                        wx_type:this.selectWx.wx_type
                    }
                }).then(res=>{
                    console.log(res)
                    let udata = res.data;
                    if(udata.status === 1){
                        if(this.searchKey!=udata.msg) {
                            return
                        }
                        if(that.searchTab_key){
                            if(that.searchTab_key === '0'){
                                that.searchListAll =[];
                                udata.data.forEach((el,idx)=>{
                                    let reg1 = new RegExp(this.searchKey,'g');
                                    let str = "<span style='color:rgb(43, 177, 70)'>"+ this.searchKey +"</span>"
//                                    if(el.Contacts){
//                                         el.Contacts.forEach((val,int)=>{
//                                             el.Contacts[int].remark? el.Contacts[int].remark = val.remark.replace(reg1,str):''
//                                             el.Contacts[int].nickname? el.Contacts[int].nickname =  val.nickname.replace(reg1,str):''
//                                        })
//                                    }else if(el.Group_chat){
//                                        el.Group_chat.forEach((val,int)=>{
//                                            el.Group_chat[int].roomname?el.Group_chat[int].roomname = val.roomname.replace(reg1,str):''
////                                            if(val.content&&val.content.length){
////                                                val.content.forEach((text,num)=>{
////                                                    val.content[num]  = text.replace(reg1,str)
////                                                })
////                                            }
//                                        })
//                                    }else if(el.Record){
                                    if(el.Record){
                                        el.Record.forEach((vale,int)=>{
                                            el.Record[int].content = vale.content.replace(reg1,str)
                                        })
                                    }
                                    that.searchListAll.push(el);
                                })
                            }else{
                                 udata.data.forEach((el,idx)=>{
                                    let reg1 = new RegExp(this.searchKey,'g');
                                    let str = "<span style='color:rgb(43, 177, 70)'>"+ this.searchKey +"</span>"
//                                    if(that.searchTab_key === '1'){
//                                        el.remark?el.remark  = el.remark.replace(reg1,str): el.nickname = el.nickname.replace(reg1,str)
//                                    }else if(that.searchTab_key === '2'){
//                                        el.roomname = el.roomname.replace(reg1,str)
////                                        el.content.forEach((val,int)=>{
////                                            el.content[int] = val.replace(reg1,str)
////                                        })
//                                    }else if(that.searchTab_key === '3'){
                                     if(that.searchTab_key === '3'){
                                        el.content = el.content.replace(reg1,str);
                                     }
                                })
                                that.searchListCustomer = udata.data
                            }
                        }
                    }
                })
            },
            getMoreFriendCircle() {
                this.listCount++
                this.getFriendsLife()
            },
            getFriendsLife(bool){//获取朋友圈
                let that = this;
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/user-friend-zone',
                    data:{
                        user_id:this.selectContact.friend_user_name||this.selectContact.username,
                        robot_username:this.selectContact.robot_username,
                        p:this.listCount,
                        n:10
                    }
                }).then(res=>{
                    let udata = res.data;

                    if(udata.status === 1){
                        console.log(udata.status)
                        udata.data.friendCircleList.forEach(el=>{
                            el.inpEmj = ''
                            el.textFlg = el.content_text.replace(/\[(.+?)\]/g, "").length;
                            !!el.content_text&&(el.content_text = emoji.stringToHtml(el.content_text))
                            el.commentList.forEach(item=>{
                                item.comment = emoji.stringToHtml(item.comment)
                            })
                        })
                        that.firendsList.length?that.firendsList = that.firendsList.concat(udata.data.friendCircleList):that.firendsList = udata.data.friendCircleList;
                        if(udata.data.friendCircleList.length!=10) {
                            let data = {
                                cmd:2043,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.selectContact.robot_username,
                                cmdData:{

                                    lastSnsId:that.firendsList.length==0?'-1':that.firendsList[that.firendsList.length-1].snsId,
                                    username:this.selectContact.friend_user_name
                                },
                                priority:0
                            }
                            comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                            this.$ws.sendMsgFun(data)
                            this.$ws.cmd2043 = msg=> {
                                if(msg.status==2&&msg.callbackMsg=='成功') {
                                    if(!!msg.cmdData.albumList) {
                                        setTimeout(_=>{
                                            this.getFriendsLifeCmd()
                                            this.$ws.cmd2043 = null
                                        },5000)
                                    }
                                    else {
                                        this.moreFriendCircleFlg = false
                                        this.$ws.cmd2043 = null
                                    }
                                }else if(msg.status==4) {
                                    this.$notification.warning({
                                        message: h=>{
                                            return h('div', {
                                                domProps: {
                                                    innerHTML:msg.callbackMsg
                                                },
                                            })
                                        },
                                        description: '暂无法执行操作，请检查手机连接状态',
                                        duration: 2,
                                        style:{
                                            background:'#fbf8e9'
                                        }
                                    });
                                }
                            }
                        }

                    }
                })
            },
            getFriendsLifeCmd() {
                let that = this;
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/user-friend-zone',
                    data:{
                        user_id:this.selectContact.friend_user_name||this.selectContact.username,
                        robot_username:this.selectContact.robot_username,
                        p:this.listCount,
                        n:10
                    }
                }).then(res=>{
                    //friendCircleList
                    let udata = res.data;
                    if(udata.status === 1){
                        udata.data.friendCircleList.forEach(el=>{
                            el.inpEmj = ''
                            el.textFlg = el.content_text.replace(/\[(.+?)\]/g, "").length;
                            !!el.content_text&&(el.content_text = emoji.stringToHtml(el.content_text))
                            el.commentList.forEach(item=>{
                                item.comment = emoji.stringToHtml(item.comment)
                            })
                        })
                        that.firendsList.length?that.firendsList = that.firendsList.concat(udata.data.friendCircleList):that.firendsList = udata.data.friendCircleList;
                        that.firendsList = comConf.arrayUnique(that.firendsList,'id')
                    }
                })
            },
            onAction(contact,type){
                //type=1 移至分组 2 消息置顶 3移除对话
                if(type==="1"){
                    this.getMoveUserGroupList()
                    this.groupSelect = contact.group_id || this.moveUserGroupList[0].id
                    this.moveGroupFlag = true;
                    this.contactGroup = contact;
                }else if(type==="2"){
                    this.moveGroupFn('2',contact)
                }else if(type==='3'){
                    this.moveGroupFn('3',contact)
                }else {
                    this.noHint(contact)
                }
            },
            clearContact(contact,index) {
                if((contact.friend_user_name==this.selectContact.friend_user_name)&&(contact.robot_username==this.selectContact.robot_username)) {
                    this.$store.commit('liveChat/clearContactItem',index)
                    this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:parseInt(contact.num)})
                    this.$store.commit('liveChat/reduceWxListNum', {username:this.selectWx.username,badge:parseInt(contact.num)})
                    this.$store.commit('liveChat/reduceLiveChatManage', {user_id:this.selectUser.id,badge:parseInt(contact.num)})
                    !!this.contactList[0]&&this.onSelect(this.contactList[0])
                }else {
                    this.$store.commit('liveChat/clearContactItem',index)
                    this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:parseInt(contact.num)})
                    this.$store.commit('liveChat/reduceWxListNum', {username:this.selectWx.username,badge:parseInt(contact.num)})
                    this.$store.commit('liveChat/reduceLiveChatManage', {user_id:this.selectUser.id,badge:parseInt(contact.num)})
                }
            },
            onSelect(contact,bool) {
                if(contact){
                    this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:parseInt(contact.num)})
                    this.$store.commit('liveChat/reduceWxListNum', {username:this.selectWx.username,badge:parseInt(contact.num)})
                    this.$store.commit('liveChat/reduceLiveChatManage', {user_id:this.selectUser.id,badge:parseInt(contact.num)})
                    if(!bool&&(contact.friend_user_name==this.selectContact.friend_user_name)&&(contact.robot_username==this.selectContact.robot_username)) {
                        return
                    }
                    this.rightKey = '0';
                    this.listCount = 1;
                    this.selectNum = [];
                    this.selectNumflg = false;
                    this.forWardSelect = false;
                    this.moreFriendCircleFlg = true
                    this.$store.commit('liveChat/setSelectContact',contact)
                    this.$store.commit('liveChat/clearChatMsgList')
                    contact.num = 0;
                    this.chatMsgLastId = 0
                    this.chatMsgScrollFlag = false
                    this.searchKeyNum = 1
                    this.tabNavList[0].title = this.selectContact.chat_type=='10'?'个人信息':'群信息'
                    this.getContactInfo()
                    !this.searchStatus&&this.getChatList(true)
                    this.searchStatus&&this.getSearchChatList(true)
                    if(this.rightKey==2) {
                        this.chatHistoryScrollFlag = false
                        this.getChatHistory(true)
                    }
                }
            },
            getContactList(bool,type,item) {
                if(this.contactScrollFlag) {
                    return
                }
                this.contactScrollFlag = true
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk',
                    data:{
                        searchKey:this.searchStatus?this.searchKey:'',
                        department_id:this.$store.state.user.user.department.id,
                        last_id:bool&&!item?0:this.contactLastId,
                        user_id:this.selectUser.id,
                        assistant_id:this.selectWx.id,
                        group_id:this.selectGroup.id,
                        username:this.selectWx.username,
                        wx_type:this.selectWx.wx_type,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(!!this.$route.query.id&&type=='0') {
                            this.getContctById(this.$route.query.id)
                        }
                        if(udata.data.contact_list.length == 0) {
//                            let text = bool?'未搜索到相关内容':'已加载完毕，无更多数据'
//                            this.$message.warning(text)
                            if(bool) {
                                this.searchChatList=[]
                                this.$store.commit('liveChat/clearContactList')
                                setTimeout(()=>{
                                    this.contactScrollFlag = false
                                },0)
                            }
                            return
                        }
                        if(this.searchStatus&&this.searchKey!='') {
                            udata.data.contact_list.forEach(el=>{
                                el.list.forEach(item=>{
                                    if(item.type==1) {
                                    let reg1 = new RegExp(this.searchKey,'g');
                                    let str = "<span style='color:rgb(43, 177, 70)'>"+ this.searchKey +"</span>"
                                    item.content = item.content.replace(reg1,str)
                                    }
                                })
                            })
                        }
                        this.contactLastId = udata.data.last_id
                        let num = 0
                        udata.data.contact_list.forEach(el=>{
                            if(el.no_hint=='0') {
                                num +=el.num
                            }
                            el.type==1&&!!el.content&&(el.content = emoji.stringToHtml(el.content))
                        })
                        bool&&this.$store.commit('liveChat/setContactList',udata.data.contact_list)
                        !bool&&this.$store.commit('liveChat/addContactList',udata.data.contact_list)
                        this.$store.commit('liveChat/addWxListNum', {username:this.selectWx.username,badge:num})
                        this.$store.commit('liveChat/reduceLiveChatManage', {user_id:this.selectUser.id,badge:num})
                        this.$store.commit('liveChat/addLiveChatManage', {user_id:this.selectUser.id,badge:num})
                        let num1 =0
                        this.liveChatManage.forEach(el=>{
                            num1+=el.num
                        })
                        this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:num})
                        setTimeout(()=>{
                            this.contactScrollFlag = false
                        },0)
                        if(!!this.$route.query.id&&type=='0') {

                        }else {
                            !item&&bool&&udata.data.contact_list.length>0&&type!='2'&&this.onSelect(udata.data.contact_list[0],bool)
                        }
//                        !item&&bool&&udata.data.contact_list.length>0&&!this.$route.query.user_id&&type!='2'&&this.onSelect(udata.data.contact_list[0],bool)
                    }
                }).catch(res=>{
                    console.log(res)
                })
            },
            getChatList(bool,is_scroll) {
                if(this.chatMsgScrollFlag) {
                    return
                }
                this.chatMsgScrollFlag = true
                let data = {}
                if(this.selectContact.chat_type == 20) {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatMsgLastId,
                        chat_type:20,
                        room_name:this.selectContact.friend_user_name,
                        robot_id:this.selectContact.robot_id,
                        wx_type:this.selectWx.wx_type
                    }
                    this.selectWx.wx_type=='10'&&this.getmoreList();
                } else {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatMsgLastId,
                        robot_id:this.selectContact.robot_id,
                        wx_type:this.selectWx.wx_type
                    }
                }
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-content',
                    data:data,
                }).then(res=> {
                    if(res){
                        let udata = res.data
                        if (udata.status == 1) {
                            if(udata.data.id!=this.selectContact.id) {
                                return
                            }
                            this.chatMsgLastId = udata.data.last_id
                            if(udata.data.msg_list.length == 0) {
    //                            this.$message.warning('已加载完毕，无更多数据')
                                return
                            }
                            let scroll_top = 0  //存储未添加数据前滚动条的高度
                            if(this.$refs.chatContent) {
                                scroll_top = this.$refs.chatContent.scrollHeight
                            }
                            udata.data.msg_list.forEach(elItem=>{
                                elItem.data.forEach((el,index)=>{
                                    el.type==1&&!!el.content&&(el.content = emoji.stringToHtml(el.content))
                                })
                            })
                            bool&&this.$store.commit('liveChat/setChatMsgList',udata.data.msg_list)
                            !bool&&this.$store.commit('liveChat/addChatMsgList',udata.data.msg_list)
                            setTimeout(()=>{
                                if(this.$refs.chatContent) {
                                    if(!is_scroll) {
                                        this.$refs.chatContent.scrollTop < (this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
                                        &&(this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
                                    } else {
                                        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight - scroll_top
                                    }
                                    this.chatMsgScrollFlag = false
                                }
                            },0)
                        }
                    }
                });
            },
            getSearchChatList(bool,type,is_add) {
                if(this.chatMsgScrollFlag) {
                    return
                }
                this.chatMsgScrollFlag = true
                let data = {
                    id:this.selectContact.id,
                    last_id:bool?'':this.chatMsgLastId,
                    robot_id:this.selectContact.robot_id,
                    wx_type:this.selectWx.wx_type
                }

                if(type==1) {
                    data.type= type  //下滚1
                    let num = 0
                    this.searchChatList.forEach(el=>{
                        el.data.forEach(item=>{
                            num++
                        })
                    })
                    data.num = num
                }

                if(bool) {
                    data.searchKey = this.searchKey
                    data.searchKeyNum = this.searchKeyNum
                }
                if(this.selectContact.chat_type == 20) {
                    data.chat_type = 20;
                    data.room_name = this.selectContact.friend_user_name||this.selectContact.room_username;
                }
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-content',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.chatMsgLastId = udata.data.last_id
                        if(udata.data.msg_list.length == 0) {
                            this.chatMsgScrollFlag = false
                            is_add==1?this.searchKeyNum-= 1:is_add==0?this.searchKeyNum+= 1:''
                            return
                        }
                        if(this.searchStatus&&this.searchKey!='') {
                            udata.data.msg_list.forEach(el=>{
                                el.data.forEach(item=>{
                                    if(item.type==1&&item.send_by=='0'&&item.status!='90') {
                                        let reg1 = new RegExp(this.searchKey,'g');
                                        let str = "<span style='color:rgb(43, 177, 70)'>"+ this.searchKey +"</span>"
                                        reg1.test(item.content)&&(item.flag = true)
                                        item.content = item.content.replace(reg1,str)
                                    }
                                })
                            })
                        }
                        bool&&(this.searchChatList = udata.data.msg_list)
                        udata.data.msg_list.forEach(elItem=>{
                            elItem.data.forEach((el,index)=>{
                                el.type==1&&!!el.content&&(el.content = emoji.stringToHtml(el.content))
                            })
                        })
                        !bool&&type==0&&(this.searchChatList = concatMsgArr(udata.data.msg_list,this.searchChatList))
                        !bool&&type==1&&(this.searchChatList = concatMsgArr(this.searchChatList,udata.data.msg_list))
//                        setTimeout(()=>{
//                            this.$refs.chatContent.scrollTop < (this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
//                            &&(this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
                            this.chatMsgScrollFlag = false
//                        },0)
                    }
                });
            },
            showEmoji(){
                this.$store.commit('liveChat/setEmojiFlag',!this.emojiFlag)
            },
            closeEmoji() {
                this.$store.commit('liveChat/setEmojiFlag',false)
            },
            emojiFlagList(item){
                this.emojiFlagOther = item.id
            },
            closEmojiList(){
                this.emojiFlagOther = ''
            },
            emojiAdd(e,itm) {
                document.getElementById('divEdit').focus()
                let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='"+ e.currentTarget.attributes.title_name.nodeValue+"'>"
                this.emojiAddInPosition(html)
                this.$refs.div_edit.changeTxt()
            },
            emojiAddInPosition(html,t) {
                let sel, range;
                if (t||this.getRange(),window.getSelection) {
                    !t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)),range.deleteContents();
                    sel = window.getSelection();//返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
                    let frag,node, lastNode;
                    if(range.createContextualFragment) {
                        frag = range.createContextualFragment(html)
                    } else {
                        let el = document.createElement("div");
                        el.innerHTML = html;
                        frag = document.createDocumentFragment()
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                    }
                    let ran = frag.lastChild;
                    range.insertNode(frag);
                    range.setStartAfter(ran);//重新定位range（光标位置）
                    sel.removeAllRanges();//清除所有选中
                    sel.addRange(range);//将新定位的range加入
                    let x = document.getElementById('divEdit')
                    let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
                    x.scrollTop < l && (x.scrollTop = l)
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            getSel() {
                window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
            },
            getRange() {
                this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
            },
            setRange() {
                let e, t;
                let x = document.getElementById('divEdit')
                document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            async sendMsg() {
//                这里只发送文字，图片和文件
                let _this =this
                if(this.searchStatus) {
                    this.quitSearch()
                    return
                }
                if(this.sendObj.text.replace(/<br\/?>/g, "").match(/^\s*$/)&&this.fileList.length==0) {
                    this.$message.warning('不能发送空白消息')
                    return
                }
                if(!this.sendObj.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
//                发送文字部分
//                敏感词检测部分
                    try {
                        let res = await this.$axios.post('/index.php?r=uc/risk/check-sensitive-words',{
                            content:this.sendObj.text
                        })
                        let udata = res.data
                        if (udata.status == 1) {
                            if(udata.data.type=='0') {
//                            正常：
                                this.sendMsgWarnStatus = '0'
                            }else if(udata.data.type=='1') {
//                            告警：
                                if(this.sendMsgWarnStatus=='1') {
                                    //已经处于告警状态
                                    this.sendMsgWarnStatus = '0'
                                }else {
                                    this.sendMsgWarnStatus = '1'
                                    let text = udata.data.list.join()
                                    this.$message.warning('发送内容包含敏感词('+ text +')，再次点击发送？')
                                    return
                                }
                            }else if(udata.data.type=='2'){
//                            阻止：
                                this.sendMsgWarnStatus = '2'
                                let text = udata.data.list.join()
                                this.$message.warning('发送内容包含敏感词('+ text +')，已阻止发送')
                                return
                            }
                        }
                    } catch (err) {
                        this.$message.error('检测敏感词出错',err)
                    }

                    let pageKey = new Date().getTime() + comConf.getRandomParams(4)
//                    区分企业号、个人号
                    let data = {}
                    if(this.selectWx.wx_type=='20') {
                        data = {
                            cmd:2505,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.selectContact.robot_username,
                            cmdData:{
                                remoteId:this.selectContact.friend_user_name,
                                content:emoji.htmlToString(this.sendObj.text)
                            },
                            pageKey:pageKey
                        }
                    }else {
                        data = {
                            cmd:2003,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.selectContact.robot_username,
                            cmdData:{
                                toUser:this.selectContact.friend_user_name,
                                content:emoji.htmlToString(this.sendObj.text)
                            },
                            pageKey:pageKey
                        }
                    }
                    if(this.selectContact.chat_type=='20'&&this.atUser.length!=0) {
                        this.atUser.forEach((el,index)=>{
                            let reg = new RegExp( "@" + el.nickname); //备注前缀正则表达式
                            if(emoji.htmlToString(this.sendObj.text).search(reg)=='-1') {
                                this.atUser.splice(index,1)
                            }
                        })
                        this.atUser = comConf.arrayUnique(this.atUser,'username')
                        this.atRoomUserStatus = false
                        data.cmdData.atuser = []
                        this.atUser.forEach(el=>{
                            data.cmdData.atuser.push(el.username)
                        })
                    }
                    if(this.$ws.ws.readyState!='1') {
                        this.SendNoticeMsg = '当前页面网络链接异常，请稍后再试'
                        this.showSendNotice = true
                        setTimeout(_=>{
                            this.showSendNotice = false
                        },1500)
                        return
                    }
                    comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    this.atUser = []
                    this.$ws.sendMsgFun(data)
//                还需要将当前联系人排到第一去，然后在聊天记录插入一句
                    _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                    let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                    let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                    let datekey = datetime.slice(0,10)
                    let msg = {
                        key:datekey,
                        data:[{
                            id:_this.selectContact.robot_id,
                            robot_avatar_url:_this.selectContact.robot_avatar_url,
                            nickname:_this.selectContact.robot_nickname,
                            created:datetime,//从go获取
                            content:_this.sendObj.text,
                            type:'1',
                            audio_time:'',
                            send_by:_this.selectContact.robot_id,
                            friend_user_name:_this.selectContact.friend_user_name,
                            pageKey:pageKey,
                            complete:true,
                            completes:false
                        }]
                    }
                    _this.$store.commit('liveChat/insertChatMsgList',msg)
                    _this.$set(_this.selectContact,'type','1')
                    _this.$set(_this.selectContact,'content',_this.sendObj.text)
                    _this.selectContact.created = datetime.substring(11)
                    _this.$set(this.sendObj,'text','')
                    _this.$refs.div_edit.clearContent()
                    setTimeout(()=>{
                        _this.$refs.contactList.scrollTop = 0
                        _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                    },0)

                }
                if(this.fileList.length!=0) {
                    _this.sendImgAndFile()
                }
            },
            sendImgAndFile() {
                for(let i=0;i<this.fileList.length;i++){
                    if(this.fileList[i].type === 'image/jpeg'|| this.fileList[i].type === 'image/jpg' || this.fileList[i].type === 'image/png') {
                        if(this.fileList[i].from=='base64') {
                            this.sendImgBase64(this.fileList[i],i)
                            this.fileList.splice(i--,1)
                        }else {

                            this.sendImgUpload(this.fileList[i],i)
                            this.fileList.splice(i--,1)
                        }
                    }else {

                        this.sendFileUpload(this.fileList[i],i)
                        this.fileList.splice(i--,1)
                    }

                }
            },
            sendImgBase64(item,index) {
                let _this = this
//                先将当前联系人排到第一去，然后在聊天记录插入一句
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/user/upload',
                    data:{
                        type:1,
                        img:item.src
                    }
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        //为了保存素材，放在上传之后添加
                        _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                        let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                        let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        let datekey = datetime.slice(0,10)
                        let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                        let msg = {
                            key:datekey,
                            data:[{
                                id:_this.selectContact.robot_id,
                                robot_avatar_url:_this.selectContact.robot_avatar_url,
                                nickname:_this.selectContact.robot_nickname,
                                created:datetime,//从go获取
                                iconurl:udata.data.path,
                                mediapath:udata.data.path,
                                bigImg:udata.data.path,
                                type:'3',
                                audio_time:'',
                                send_by:_this.selectContact.robot_id,
                                friend_user_name:_this.selectContact.friend_user_name,
                                pageKey:pageKey,
                                complete:true,
                                completes:false
                            }]
                        }

                        _this.$store.commit('liveChat/insertChatMsgList',msg)
                        _this.selectContact.content = '[图片]'
                        _this.selectContact.type = '3'
                        _this.selectContact.created = datetime.substring(11)
                        setTimeout(()=>{
                            _this.$refs.contactList.scrollTop = 0
                            _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                        },0)
                        //                发送图片
                        let data = {}
                        if(this.selectWx.wx_type=='20') {
                            data = {
                                cmd:2506,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.selectContact.robot_username,
                                cmdData:{
                                    remoteId:this.selectContact.friend_user_name,
                                    imageUrl:udata.data.path,
                                },
                                pageKey:pageKey
                            }
                        }else {
                            data = {
                                cmd:2004,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.selectContact.robot_username,
                                cmdData:{
                                    toUser:this.selectContact.friend_user_name,
                                    imgpath:[udata.data.path],
                                },
                                pageKey:pageKey
                            }
                        }
                        comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        this.$ws.sendMsgFun(data)
                    }
                })
            },
            sendImgUpload(item,index) {
                let _this = this

                //                先将当前联系人排到第一去，然后在聊天记录插入一句

                let formData = new FormData();
                formData.append('file', item);
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/user/upload',
                    data:formData,
                    transformRequest: [function (data) {
                        return data;
                    }],
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        //为了保存素材，放在上传之后添加
                        _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                        let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                        let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        let datekey = datetime.slice(0,10)
                        let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                        let msg = {
                            key:datekey,
                            data:[{
                                id:_this.selectContact.robot_id,
                                robot_avatar_url:_this.selectContact.robot_avatar_url,
                                nickname:_this.selectContact.robot_nickname,
                                created:datetime,//从go获取
                                iconurl:udata.data.path,
                                mediapath:udata.data.path,
                                bigImg:udata.data.path,
                                type:'3',
                                audio_time:'',
                                send_by:_this.selectContact.robot_id,
                                friend_user_name:_this.selectContact.friend_user_name,
                                pageKey:pageKey,
                                complete:true,
                                completes:false
                            }]
                        }
                        _this.$store.commit('liveChat/insertChatMsgList',msg)
                        _this.selectContact.content = '[图片]'
                        _this.selectContact.type = '3'
                        _this.selectContact.created = datetime.substring(11)
                        setTimeout(()=>{
                            _this.$refs.contactList.scrollTop = 0
                            _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                        },0)

                        let data = {}
                        if(this.selectWx.wx_type=='20') {
                            data = {
                                cmd:2506,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.selectContact.robot_username,
                                cmdData:{
                                    remoteId:this.selectContact.friend_user_name,
                                    imageUrl:udata.data.path,
                                },
                                pageKey:pageKey
                            }
                        }else {
                            data = {
                                cmd:2004,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.selectContact.robot_username,
                                cmdData:{
                                    toUser:this.selectContact.friend_user_name,
                                    imgpath:[udata.data.path],
                                },
                                pageKey:pageKey
                            }
                        }
                        comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        this.$ws.sendMsgFun(data)
                    }
                })
            },
            sendFileUpload(item,index) {
                let _this = this

//                发送文件
                let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                let datekey = datetime.slice(0,10)
                let msg = {
                    key:datekey,
                    data:[{
                        id:_this.selectContact.robot_id,
                        robot_avatar_url:_this.selectContact.robot_avatar_url,
                        nickname:_this.selectContact.robot_nickname,
                        created:datetime,//从go获取
                        type:'6',
                        title:item.name,
                        desc:item.fileSize,
                        send_by:_this.selectContact.robot_id,
                        friend_user_name:_this.selectContact.friend_user_name,
                        mediapath:'',
                        complete:true,
                        completes:false,
                        pageKey:pageKey
                    }]
                }
                _this.$store.commit('liveChat/insertChatMsgList',msg)
                _this.selectContact.content = '[文件]'
                _this.selectContact.type = '6'
                _this.selectContact.created = datetime.substring(11)
                setTimeout(()=>{
                    _this.$refs.contactList.scrollTop = 0
                    _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                },0)

                let formData = new FormData();
                formData.append('file', item);
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/user/upload',
                    data:formData,
                    transformRequest: [function (data) {
                        return data;
                    }],
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        let data = {
                            cmd:2056,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.selectContact.robot_username,
                            cmdData:{
                                toUser:this.selectContact.friend_user_name,
                                fileUrl:udata.data.path,
                                fileName:item.name
                            },
                            pageKey:pageKey
                        }
                        if(this.$ws.ws.readyState!='1') {
                            this.showSendNotice = true
                            setTimeout(_=>{
                                this.showSendNotice = false
                            },1500)
                            return
                        }
                        comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        this.$ws.sendMsgFun(data)
                    }
                })
            },
            pasteFn(e){
                console.log(this.$refs.div_edit)
                this.$refs.div_edit.addEventListener('paste',function(e){
                    console.log(e)
                })
            },
            pasteImg(imgs) {
                if(this.searchStatus) {
                    this.quitSearch()
                    return
                }
                this.fileList.push({
                    type:'image/jpeg',
                    src:imgs,
                    from:'base64'
                })
            },
            beforeUpload (file) {
                this.isxflag = false
                this.isxflagD  = false
                if(this.searchStatus) {
                    this.quitSearch()
                    return false
                }
                let isIMG = file.type === 'image/jpeg'|| file.type === 'image/jpg' || file.type === 'image/png';
                if(!isIMG){
                    this.fileBeforeUpload(file)
                }else{
                    if (!isIMG) {
                        this.$message.error('只能上传图片')
                    }
                    let isLt2M = file.size / 1024 / 1024 < 5
                    if (!isLt2M) {
                        this.$message.error('图片大小必须小于5MB!')
                    }
                    if(isIMG && isLt2M) {
                        file.src = window.URL.createObjectURL(file)
                        this.fileList = [...this.fileList, file]
                    }
                    return false
                }
            },
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                let isIMG = info.file.type === 'image/jpeg'|| info.file.type === 'image/jpeg' || info.file.type === 'image/png';
                if(!isIMG){
                    this.fileHandleChange(info)
                }else{
                    if (info.file.status === 'done') {
                        if(info.file.response.status==1) {
                            this.sendImgFlag = true
                            this.sendObj.img_url = info.file.response.data.path;
                            this.isxflag =false;
                            this.isxflagD = false;
                        } else {
                            this.$message.warning(info.file.response.msg)
                        }
                    } else if (info.file.status === 'error') {
                        this.$message.error(`${info.file.name} file upload failed.`);
                    }
                }
            },
            fileBeforeUpload(file) {
                if(this.searchStatus) {
                    this.quitSearch()
                    return false
                }
                let isIMG = file.type === 'image/jpeg'|| file.type === 'image/jpg' || file.type === 'image/png';
                if(isIMG){
                    this.beforeUpload(file)
                    return false
                }
                if(file.size == 0) {
                    this.$message.error('不能上传空文件!')
                    return false
                }
                let isLt2M = file.size / 1024 / 1024 < 20
                if (!isLt2M) {
                    this.$message.error('文件大小必须小于20MB!')
                }
                if(isLt2M) {
                    file.fileSize = this.sizeChange(file.size)
                    this.fileList = [...this.fileList, file]
                }
                return false
            },
            // fileHandleChange(info) {
            //     if (info.file.status !== 'uploading') {
            //         console.log(info.file, info.fileList);
            //     }
            //     if (info.file.status === 'done') {
            //         if(info.file.response.status==1) {
            //             this.sendFileFlag = true
            //             this.sendFile.file_url = info.file.response.data.path;
            //             this.sendFile.name = info.file.name;
            //             this.sendFile.size = this.sizeChange(info.file.size);
            //             this.isxflag =false;
            //             this.isxflagD = false;
            //         } else {
            //             this.$message.warning(info.file.response.msg)
            //         }
            //     } else if (info.file.status === 'error') {
            //         this.$message.error(`${info.file.name} file upload failed.`);
            //     }
            // },
            sizeChange(limit){
                let size = "";
                if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
                    size = limit.toFixed(2) + "B"
                }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
                    size = (limit/1024).toFixed(2) + "KB"
                }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
                    size = (limit/(1024 * 1024)).toFixed(2) + "MB"
                }else{                                            //其他转化成GB
                    size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
                }
                return size;
            },
            handleOk() {
                let _this = this
//                发送图片
                let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                let data = {
                    cmd:2004,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        toUser:this.selectContact.friend_user_name,
                        imgpath:[this.sendObj.img_url],
                    },
                    pageKey:pageKey
                }
                if(this.$ws.ws.readyState!='1') {
                    this.showSendNotice = true
                    setTimeout(_=>{
                        this.showSendNotice = false
                    },1500)
                    return
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)

//                将当前联系人排到第一去，然后在聊天记录插入一句
                _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                let datekey = datetime.slice(0,10)
                let msg = {
                    key:datekey,
                    data:[{
                        id:_this.selectContact.robot_id,
                        robot_avatar_url:_this.selectContact.robot_avatar_url,
                        nickname:_this.selectContact.robot_nickname,
                        created:datetime,//从go获取
                        iconurl:_this.sendObj.img_url,
                        bigImg:_this.sendObj.img_url,
                        type:'3',
                        audio_time:'',
                        send_by:_this.selectContact.robot_id,
                        friend_user_name:_this.selectContact.friend_user_name,
                        pageKey:pageKey
                    }]
                }
                _this.$store.commit('liveChat/insertChatMsgList',msg)
                _this.selectContact.content = '[图片]'
                _this.selectContact.type = '3'
                _this.selectContact.created = datetime.substring(11)
                _this.sendImgFlag = false
                setTimeout(()=>{
                    _this.$refs.contactList.scrollTop = 0
                    _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                },0)
            },
            handleCancel() {
                this.sendImgFlag = false
                this.sendObj.img_url = ''
                this.isxflag?this.isxflag = !this.isxflag:this.isxflag
                this.isxflagD?this.isxflagD = !this.isxflagD:this.isxflagD
            },
            handleFileOk() {
                let _this = this
//                发送文件
                let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                let data = {
                    cmd:2056,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        toUser:this.selectContact.friend_user_name,
                        fileUrl:this.sendFile.file_url,
                        fileName:this.sendFile.name
                    },
                    pageKey:pageKey
                }
                if(this.$ws.ws.readyState!='1') {
                    this.showSendNotice = true
                    setTimeout(_=>{
                        this.showSendNotice = false
                    },1500)
                    return
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                let datekey = datetime.slice(0,10)
                let msg = {
                    key:datekey,
                    data:[{
                        id:_this.selectContact.robot_id,
                        robot_avatar_url:_this.selectContact.robot_avatar_url,
                        nickname:_this.selectContact.robot_nickname,
                        created:datetime,//从go获取
                        type:'6',
                        title:this.sendFile.name,
                        desc:this.sendFile.size,
                        send_by:_this.selectContact.robot_id,
                        friend_user_name:_this.selectContact.friend_user_name,
                        mediapath:'',
                        pageKey:pageKey
                    }]
                }
                _this.$store.commit('liveChat/insertChatMsgList',msg)
                _this.selectContact.content = '[文件]'
                _this.selectContact.type = '6'
                _this.selectContact.created = datetime.substring(11)
                _this.sendFileFlag = false
                setTimeout(()=>{
                    _this.$refs.contactList.scrollTop = 0
                    _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                },0)
            },
            fileHandleCancel() {
                this.isxflag?this.isxflag = !this.isxflag:this.isxflag
                this.isxflagD?this.isxflagD = !this.isxflagD:this.isxflagD
                this.sendFileFlag = false
                this.sendFile={
                    name:'',
                    size:'',
                    file_url:''
                }
            },
            /*获取联系人个人信息及标签*/
            getContactInfo() {
                let data = {
                    id:this.selectContact.id,
                    department_id:this.$store.state.user.user.department.id,
                    chat_type:this.selectContact.chat_type || '10',
                    username:this.selectContact.robot_username,
                    wx_type:this.selectWx.wx_type
                }
                if(data.chat_type == '20') {
                    data.room_username = this.selectContact.friend_user_name
                }
                let that  = this
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/firend-msg',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(!this.selectContact.id||udata.data.contact.info.id!=this.selectContact.id) {
                            return
                        }
                        this.contactInfo = udata.data.contact.info
                        if(this.contactInfo.birth=='0000-00-00') {
                            this.contactInfo.birth = ''
                        }
                        // this.contactInfo.tel = this.contactInfo.tel.substring(0,this.contactInfo.tel.length-1)
                        this.contactLabel = udata.data.contact.label
                        this.liveChattel = this.contactInfo.tel_arr&&this.contactInfo.tel_arr[0];
                        this.contactLabel.forEach(el=>{
                            el.showFlag = true
                        })
                        this.contactInfoEdit = false
                        this.contactWxInfoEdit = false
                        this.contactDescEdit = false
                        this.roomNoticeEdit = false
                        this.groupName = false
                        this.groupNickname = false
//                        if(this.selectContact.chat_type=='20') {
//                            this.welcome_own = udata.data.contact.welcome&&udata.data.contact.welcome.list.length !=0 ?udata.data.contact.welcome.list:[]
//                            this.auto_reply_own = udata.data.contact.auto_reply&&udata.data.contact.auto_reply.list
//                            this.contactInfo.is_expire_time = comConf.compareTime(this.contactInfo.qr_code_expire_time,comConf.formatDate(new Date()))
//                            this.contactInfo.RoomNotice = emoji.stringToHtml(this.contactInfo.RoomNotice)
//                        }
                    }
                })
            },
//            个人号机器人修改企业微信备注
            handleWxSubmit() {
                if(this.contactInfo.remark==this.interimContactInfo.remark) {
                    this.contactWxInfoEdit = false
                    return
                }
                let data = {
                    cmd:2041,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        username:this.selectContact.friend_user_name,
                        remark :this.contactInfo.remark,
                    }
                }
                this.$ws.sendMsgFun(data)
                this.contactWxInfoEdit = false
                this.$ws.cmd2041 = msg=>{
                    if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }else if(msg.status==2) {
                        this.$message.warning('修改成功')
                    }
                }
            },
            /*保存联系人个人信息*/
            handleSubmit(type) {
                if(type==1) {
                    let arr = this.contactInfo.tel.replace(/，/g,",").split(',')
                    if(arr.length>5) {
                        this.$message.warning('手机号不能多于5个')
                        return
                    }
                    let flag = false
                    arr.forEach(el=>{
//                        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(el)&&el!='') {
                        if(!/^[0-9]+$/.test(el)&&el!='') {
                            flag = true
                        }
                    })
                    if(flag) {
                        this.$message.warning('请输入正确的手机号码')
                        return
                    }
                }
                if(this.contactInfo.remark==this.interimContactInfo.remark&&this.contactInfo.desc==this.interimContactInfo.desc&&this.contactInfo.tel==this.interimContactInfo.tel&&this.contactInfo.address==this.interimContactInfo.address&&this.contactInfo.birth==this.interimContactInfo.birth) {
                    if(type=='1') {
                        this.contactInfoEdit = false
                    }else {
                        this.contactDescEdit = false
                    }
                    return
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/firend-msg-save',
                    data:this.contactInfo
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('保存成功')
                        if(type=='1') {
                            this.contactInfoEdit = false
                        }else {
                            this.contactDescEdit = false
                        }
                    }
                });
                if(this.contactInfo.remark==this.interimContactInfo.remark&&this.contactInfo.desc==this.interimContactInfo.desc&&this.contactInfo.tel==this.interimContactInfo.tel) {
                    if(type=='1') {
                        this.contactInfoEdit = false
                    }else {
                        this.contactDescEdit = false
                    }
                    return
                }
                let data = {
                    cmd:2041,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        username:this.selectContact.friend_user_name,
                        remark :this.contactInfo.remark,
                        phone :this.contactInfo.tel.replace(/，/g,",").split(','),//手机号
                        desc : this.contactInfo.desc//描述
                    }
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2041 = msg=>{
                    if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }
            },
            contactInfoSave() {
                if(this.contactInfoEdit) {
                    this.handleSubmit('1')
                }else {
                    this.contactInfoEdit = !this.contactInfoEdit
                    this.interimContactInfo = JSON.parse(JSON.stringify(this.contactInfo))
                }
            },
            contactWxInfoSave() {
                if(this.contactWxInfoEdit) {
                    this.handleWxSubmit()
                }else {
                    this.contactWxInfoEdit = !this.contactWxInfoEdit
                    this.interimContactInfo = JSON.parse(JSON.stringify(this.contactInfo))
                }
            },
            contactDescSave() {
                if(this.contactDescEdit) {
                    this.handleSubmit('2')
                }else {
                    this.contactDescEdit = !this.contactDescEdit
                    this.interimContactInfo = JSON.parse(JSON.stringify(this.contactInfo))
                }
            },
            roomInfoSave() {
                if(this.roomInfoEdit) {
                    this.handleSubmit_room('1')
                }else {
                    this.roomInfoEdit = !this.roomInfoEdit
                }
            },
            roomNoticeSave() {

                if(this.contactInfo.is_own==0||this.contactInfo.isInRoom==0) {
                    this.$message.warning('只有群主可以编辑')
                    return
                }else{
                    this.roomNoticeEdit = !this.roomNoticeEdit
                }
                if(!this.roomNoticeEdit) {
                    this.handleSubmit_room('2')
                    this.roomNoticeEdit = this.roomNoticeEdit
                }else {
                    this.interimRoomInfo.RoomNotice = this.contactInfo.RoomNotice
                }
            },
            changeEdit(type){
                if(!this.contactInfo.isInRoom) {
                    return
                }
                if(type === '1'){
                    this.groupName = !this.groupName
                    if(!this.groupName) {
                        this.handleSubmit_room('1')
                        this.groupName = this.groupName;
                    }else {
                        this.interimRoomInfo.room_name = this.contactInfo.room_name
                    }
                }else if(type === '2'){
                    this.groupNickname = !this.groupNickname;
                    if(!this.groupNickname) {
                        this.handleSubmit_room('3')
                        this.groupNickname = this.groupNickname;
                    }else {
                        this.interimRoomInfo.room_nickname = this.contactInfo.room_nickname
                    }
                }
            },
            getmoreList(val){ //获取群成员
                if(val){
                    this.getMorFlg?this.morlist = 10:this.morlist = 100
                    this.getMorFlg = !this.getMorFlg;
                }
                let that = this;
                this.getMorFlg?this.getFridtype = 1:this.getFridtype = 0;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/room-member-list',
                    data:{
                        room_id:this.selectContact.id,
                        keyword:null,
                        type:this.getFridtype
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        that.groupUserList = udata.data;
                    }
                });
            },
            roomQrcodeRefresh() {
                this.$ws.cmd2020 = null
                let data = {
                    cmd:2020,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,//指令消息的接收者。发送给对应的客户端连接ID
                    cmdData:{
                        username:this.selectContact.friend_user_name
                    },
                    priority:0
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2020 = msg=>{
                    if(msg.callbackMsg=='成功'){
                        this.getContactInfo()
                    }else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }
            },
            /*修改群信息*/
            handleSubmit_room(type) {
//                2018,2019,2021
//                是群主
                if(type==1) {
                    if(this.interimRoomInfo.room_name == this.contactInfo.room_name) {
                        return
                    }
                    let data_2018 = {
                        cmd:2018,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:{
                            username:this.selectContact.friend_user_name,
                            nickname :this.contactInfo.room_name
                        }
                    }
                    comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    this.$ws.sendMsgFun(data_2018)
                    this.$ws.cmd2018 = msg=>{
                        if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                }else if(type==2){
                    if(this.interimRoomInfo.RoomNotice == this.contactInfo.RoomNotice) {
                        return
                    }
                    let data_2021 = {
                        cmd:2021,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:{
                            username:this.selectContact.friend_user_name,
                            noticeContent :this.contactInfo.RoomNotice
                        }
                    }
                    comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    this.$ws.sendMsgFun(data_2021)
                    this.$ws.cmd2021 = msg=>{
                        if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                }else {
                    if(this.interimRoomInfo.room_nickname == this.contactInfo.room_nickname) {
                        return
                    }
                    let data_2019={
                        cmd:2019,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:{
                            username:this.selectContact.friend_user_name,
                            nickname :this.contactInfo.room_nickname
                        }
                    }
                    comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    this.$ws.sendMsgFun(data_2019)
                    this.$ws.cmd2019 = msg=>{
                        if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                }
            },
            closeTag(e,item,index) {
                let _this =this;
                e.preventDefault()
                let msg = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        username:this.selectContact.friend_user_name,
                        labels:[item.label_name]
                    }
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2040 = msg=> {
                    if(msg.status==2) {
                        item.showFlag = false
                        _this.$set(_this.contactLabel,index,item)
                        _this.$message.success('删除成功')
                    }else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }else {
                        item.showFlag = false
                    }
                }
            },
            contactAddTag() {
                if(this.selectContact.chat_type==20) {
                    if(!this.contactInfo.isInRoom&&this.selectWx.wx_type=='10') {
                        return
                    }
                    this.getAllLabel('20')
                } else {
                    this.getAllLabel('10')
                }
                this.selectTagFlag = true
            },
            getAllLabel(type) {
                if(type=='10') {
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/material/customer-label',
                        data:{
                            department_id:this.$store.state.user.user.department.id,
                            company:1,
                            friend_id:this.selectContact.id,
                            wx_type:this.selectWx.wx_type
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.allLabel = udata.data
                            this.allLabel.forEach(el=>{
                                this.contactLabel.forEach(item=>{
                                    if(el.id==item.id) {
                                        el.check = true
                                    }
                                })
                            })
                        }
                    });
                }else {
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/customer/room-label-all',
                        data:{
                            department_id:this.$store.state.user.user.department.id
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.allLabel = udata.data
                            this.allLabel.forEach(el=>{
                                this.contactLabel.forEach(item=>{
                                    if(el.id==item.id) {
                                        el.check = true
                                    }
                                })
                            })
                        }
                    });
                }

            },
            handleTagChange(item,index,checked) {
                item.check = checked
                this.$set(this.allLabel,index,item)
            },
            handleTagOk() {
                let _this = this;
                let selectTag = []
                this.allLabel.forEach(el=>{
                    if(el.check) {
                        if(this.selectContact.chat_type=='10'&&this.selectWx.wx_type=='10') {
                            selectTag.push(el.id+'_'+el.title)
                        }else {
                            selectTag.push(el.id)
                        }
                    }
                })
//                个人号打标签
                if(this.selectWx.wx_type=='10') {
                    if(this.selectContact.chat_type=='10') {
                        let msg_add = {
                            cmd:2040,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.selectContact.robot_username,
                            cmdData:{
                                username:this.selectContact.friend_user_name,
                                labels:selectTag
                            }
                        }
                        comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        this.$ws.sendMsgFun(msg_add)
                        this.$ws.cmd2040 = msg=> {
                            if(msg.status==2) {
                                this.selectTagFlag=false
                                this.$message.success(msg.callbackMsg)
                                _this.getContactInfo()
                            }else if(msg.status==4) {
                                this.$notification.warning({
                                    message: h=>{
                                        return h('div', {
                                            domProps: {
                                                innerHTML:msg.callbackMsg
                                            },
                                        })
                                    },
                                    description: '暂无法执行操作，请检查手机连接状态',
                                    duration: 2,
                                    style:{
                                        background:'#fbf8e9'
                                    }
                                });
                            }else {
                                this.selectTagFlag=false
                                this.getContactInfo()
                            }
                        }
                    } else {
                        this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/customer/room-label-up',
                            data:{
                                roomId:this.contactInfo.id,
                                labelIds:selectTag
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                this.$message.success('设置标签成功')
                                this.getContactInfo()
                                this.selectTagFlag=false
                            }
                        });
                    }
                }else {
                    let data={}
                    if(this.selectContact.chat_type=='10') {
                        data={
                            userid:this.selectWx.userid,
                            tagList:selectTag,
                            userList:[this.selectContact.id]
                        }
                    }else {
                        data={
                            userid:this.selectWx.userid,
                            tagList:selectTag,
                            roomlist:[this.contactInfo.room_username],
                            add_type:1
                        }
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/qiyewxapi/addtag?',
                        data:data
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success('设置标签成功')
                            this.getContactInfo()
                            this.selectTagFlag=false
                        }
                    });

                }
            },
            emitMaterialEmpty() {
                this.$refs.searchMaterialKey.focus()
                this.searchMaterialKey = ''
                this.getFastReply()
            },
            getFastReply() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/material/material',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        ask:1,
                        searchKey:this.searchMaterialKey,
                        type:1
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.fastReply = udata.data.list
                        this.fastReply.forEach(el=>{
                            if(el.type==1) {
                                !!el.content&&(el.content = emoji.stringToHtml(el.content))
                            }
                        })

                    }
                });
            },
            //发送快捷回复
            async sendMaterial(item) {
                let _this =this
                if(this.searchStatus) {
                    this.quitSearch()
                    return
                }
                if(item.type=='1') {
                    //                    敏感词检测部分
                    try {
                        let res = await this.$axios.post('/index.php?r=uc/risk/check-sensitive-words',{
                            content:emoji.htmlToString(item.content)
                        })
                        let udata = res.data
                        if (udata.status == 1) {
                            if(udata.data.type=='0') {
//                            正常：
                                item.sendMsgWarnStatus = '0'
                            }else if(udata.data.type=='1') {
//                            告警：
                                if(item.sendMsgWarnStatus=='1') {
                                    //已经处于告警状态
                                    item.sendMsgWarnStatus = '0'
                                }else {
                                    item.sendMsgWarnStatus = '1'
                                    this.$set(item,'showSendNotice',true)
                                    let text = udata.data.list.join()
                                    this.$set(item,'SendNoticeMsg','发送内容包含敏感词('+ text +')，再次点击发送？')
                                    setTimeout(_=>{
                                        this.$set(item,'showSendNotice',false)
                                    },3000)
                                    return
                                }
                            }else if(udata.data.type=='2'){
//                            阻止：
                                item.sendMsgWarnStatus = '2'
                                this.$set(item,'showSendNotice',true)
                                let text = udata.data.list.join()
                                this.$set(item,'SendNoticeMsg','发送内容包含敏感词('+ text +')，已阻止发送')
                                setTimeout(_=>{
                                    this.$set(item,'showSendNotice',false)
                                },3000)
                                return
                            }
                        }
                    } catch (err) {
                        this.$message.error('检测敏感词出错',err)
                    }
                }

                let pageKey = new Date().getTime() + comConf.getRandomParams(4)
                let data = {
                    cmd:0,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{},
                    pageKey:pageKey
                }
                switch (item.type) {
                    case '1':
//                        文字
                        if(this.selectWx.wx_type=='20') {
                            data.cmd = 2505
                            data.cmdData = {
                                remoteId:this.selectContact.friend_user_name,
                                content:emoji.htmlToString(item.content),
                            }
                        }else {
                            data.cmd = 2003
                            data.cmdData = {
                                toUser:this.selectContact.friend_user_name,
                                content:emoji.htmlToString(item.content),
                            }
                        }
                        break
                    case '2':
//                        图片
                        if(this.selectWx.wx_type=='20') {
                            data.cmd = 2506
                            data.cmdData = {
                                remoteId:this.selectContact.friend_user_name,
                                imageUrl:item.mediapath,
                            }
                        }else {
                            data.cmd = 2004
                            data.cmdData = {
                                toUser:this.selectContact.friend_user_name,
                                imgpath:[item.mediapath],
                            }
                        }
                        break
                    case '3':
//                        链接
                        data.cmd = 2007
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            title:item.title,
                            description:item.desc,
                            url:item.url,
                            imgUrl:item.mediapath,
                        }
                        break
                    case '7':
//                        公众号
                        data.cmd = 2006
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            primeval:item.orginid,
                            nickname:item.title,
                            alias:item.alias,
                        }
                        break
                    case '8':
//                        小程序
                        data.cmd = 2005
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            title:item.title,
                            description:item.desc,
                            url:item.url,
                            primeval:item.orginid,
                            appid:item.appid,
                            smallIconUrl:item.iconurl,
                            imgUrl:item.mediapath
                        }
                        break
                    case '10':
                        data.cmd = 2056
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            fileUrl:item.mediapath,
                            fileName:item.title
                        }
                        break
                    case '11':
                        // 视频素材
                        data.cmd = 2057
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            videoUrl:item.mediapath,
                            thumbUrl:item.mediapath+'?vframe/jpg/offset/1/w/200/h/200',
                            videoLength:10
//                            videoLength:item.mediapath + '?avinfo'.format.duration
                        }
                        break
                }
                if(this.$ws.ws.readyState!='1') {
                    this.showSendNotice = true
                    setTimeout(_=>{
                        this.showSendNotice = false
                    },1500)
                    return
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)

//                插入对应消息
                _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                let datekey = datetime.slice(0,10)
                let data1 = {
                    id:_this.selectContact.robot_id,
                    robot_avatar_url:_this.selectContact.robot_avatar_url,
                    nickname:_this.selectContact.robot_nickname,
                    created:datetime,//从go获取
                    content:'',
                    type:'',
                    send_by:_this.selectContact.robot_id,
                    friend_user_name:_this.selectContact.friend_user_name,
                    pageKey:pageKey,
                    complete:true,
                    completes:false
                }
                switch (item.type) {
                    case '1':
//                        文字
                        data1.content = item.content
                        data1.type = '1'
                        break
                    case '2':
//                        图片
                        data1.iconurl = item.mediapath
                        data1.bigImg = item.mediapath
                        data1.type = '3'
                        break
                    case '3':
//                        链接
                        data1.type = '5'
                        data1.title=item.title
                        data1.url =item.url
                        data1.desc=item.desc
                        data1.mediapath = item.mediapath
                        break
                    case '7':
//                        公众号
                        data1.type = '42'
                        data1.title=item.title
                        data1.appid=item.orginid
                        data1.certFlag = '24'
                        data1.mediapath = item.mediapath || ''
                        break
                    case '8':
//                        小程序
                        data1.type = '33'
                        data1.iconurl = item.iconurl
                        data1.alias = item.alias
                        data1.desc = item.desc
                        data1.title = item.title
                        data1.mediapath = item.mediapath
                        data1.url = item.url
                        data1.orginid = item.orginid
                        data1.appid = item.appid
                        break
                    case '10':
//                        文件
                        data1.type = '6'
                        data1.title=item.title
                        data1.desc=item.desc
                        data1.url = item.mediapath
                        data1.mediapath = ''
                        break
                    case '11':
//                        视频
                        data1.type = '43'
                        data1.mediapath = item.mediapath
                        data1.iconurl = item.mediapath + '?vframe/jpg/offset/1/w/200/h/200'
                        break
                }
                let msg = {
                    key:datekey,
                    data:[data1]
                }
                _this.$store.commit('liveChat/insertChatMsgList',msg)
                _this.$set(_this.selectContact,'content',item.content)
                _this.$set(_this.selectContact,'type',data1.type)
                _this.selectContact.created = datetime.substring(11)
                setTimeout(()=>{
                    _this.$refs.contactList.scrollTop = 0
                    _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                },0)
            },
            getChatHistory(bool,is_scroll) {
                if(this.chatHistoryScrollFlag) {
                    return
                }
                this.chatHistoryScrollFlag = true
                let data = {}
                if(this.selectContact.chat_type == 20) {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatHistoryLastId,
                        chat_type:20,
                        room_name:this.selectContact.friend_user_name,
                        robot_id:this.selectContact.robot_id,
                        wx_type:this.selectWx.wx_type
                    }
                } else {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatHistoryLastId,
                        robot_id:this.selectContact.robot_id,
                        wx_type:this.selectWx.wx_type
                    }
                }
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-content',
                    data:data,
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data.msg_list.length == 0) {
                            return
                        }
                        this.chatHistoryLastId = udata.data.last_id
                        bool&&(this.chatHistory = udata.data.msg_list)
                        !bool&&(this.chatHistory = concatMsgArr(udata.data.msg_list,this.chatHistory))
                        this.chatHistory.forEach(elItem=>{
                            elItem.data.forEach((el,index)=>{
                                el.type==1&&!!el.content&&(el.content = emoji.stringToHtml(el.content))
                            })
                        })
                        let scroll_top = this.$refs.chatHistoryContent.scrollHeight
                        setTimeout(()=>{
                            if(!is_scroll) {
                                this.$refs.chatHistoryContent.scrollTop < (this.$refs.chatHistoryContent.scrollHeight - this.$refs.chatHistoryContent.offsetHeight)
                                &&(this.$refs.chatHistoryContent.scrollTop = this.$refs.chatHistoryContent.scrollHeight - this.$refs.chatHistoryContent.offsetHeight)
                            } else {
                                this.$refs.chatHistoryContent.scrollTop = this.$refs.chatHistoryContent.scrollHeight - scroll_top
                            }
                            this.chatHistoryScrollFlag = false
                        },0)
                    }
                });
            },
            getBuyHistory(type) {
                if(type=='1') {
                    this.buyPage +=1
                }
                if(this.selectWx.wx_type=='10') {
                    this.$axios({
                        method: 'get',
                        url: '/index.php?r=uc/customer/order-list',
                        params:{
                            id:this.selectContact.id,
                            p:this.buyPage,
                            n:'10'
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            if(type=='1') {
                                this.buyHistory = this.buyHistory.concat(udata.data.list)
                            }else {
                                this.buyHistory = udata.data.list
                            }
                            if(udata.data.list.length<10) {
                                this.moreBuyHistoryFlag = false
                            }else {
                                this.moreBuyHistoryFlag = true
                            }
                        }
                    });
                }else {
                    this.$axios({
                        method:'POST',
                        url:'/qiyewxapi/getorderlist?',
                        data:{
                            id:this.selectContact.id,
                            user:this.selectWx.userid,
                            p:this.buyPage,
                            n:'10'
                        }
                    }).then(res=>{
                        let udata = res.data
                        if(udata.status === 1){
                            udata.data.list.forEach(el=>{
                                el.all_price = this.formatNumberNum(el.all_price)
                            })
                            if(type=='1') {
                                this.buyHistory = this.buyHistory.concat(udata.data.list)
                            }else {
                                this.buyHistory = udata.data.list
                            }
                            if(udata.data.list.length<10) {
                                this.moreBuyHistoryFlag = false
                            }else {
                                this.moreBuyHistoryFlag = true
                            }
                        }
                    })
                }
            },
            editContentFB(bool) {

                this.focus_blur = bool
            },
            editContent(bool) {
                this.focus_blur = bool
            },
            getAtUser(data) {
                console.log(data)
                if(this.selectContact.chat_type!='20') {
                    return
                }
                if(data.type==1||data.type==2) {
                    this.atRoomUser = []
                    this.atRoomUserStatus = true
                }else if(data.type==3) {
                    this.atRoomUserStatus = false
                }
                this.atSearchKey = data.key
                if(this.atRoomUserStatus) {
                    this.atTop = data.top
                    this.atLeft = data.left
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/communication/group-user-list',
                        data:{
                            searchKey:this.atSearchKey,
                            roomId:this.selectContact.id,
                            assistantId:this.selectContact.robot_username
                        }
                    }).then(res=>{
                        let udata = res.data
                        if (udata.status == 1) {
                            this.atRoomUser = udata.data
                        }
                    })
                }
            },
            selectAtUser(item) {
                this.atRoomUserStatus = false
                this.atRoomUser = []
                if(!!item.id) {
                    if(this.atSearchKey!='') {
                        item.nickname = item.nickname.replace(this.atSearchKey,'')
                    }
                    this.userAddInPosition(item)
                    this.$refs.div_edit.changeTxt()
                }else {
                    let item1 = JSON.parse(JSON.stringify(item))
                    item1.nickname = '@' + item1.nickname
                    this.userAddInPosition(item1)
                    this.$refs.div_edit.changeTxt()
//                    this.$refs.div_edit.addText(item)
                }
                this.atUser.push(item)
                this.atSearchKey = ''
            },
            forward(){//转发 1 一条 2多条
                let type = []
                let content = []
                let appid = []
                let alias = []
                let orginid = []
                let title = []
                let desc = []
                let url = []
                let iconurl = []
                let mediapath = []
                let sendUser = []
                let data = {}
                if(this.fowardNum === '1'){ //多条转发
                    console.log('多条转发')
                    this.forwardUserListChose.forEach(el=>{
                        sendUser.push(el.username)
                    })
                    this.selectNum.forEach(el=>{
                        type.push(el.data.type||'')
                        content.push(emoji.htmlToString(el.data.content||''))
                        appid.push(el.data.appid||'')
                        alias.push(el.data.alias||'')
                        orginid.push(el.data.orginid||'')
                        title.push(el.data.title||'')
                        desc.push(el.data.desc||'')
                        url.push(el.data.url||'')
                        iconurl.push(el.data.iconurl||'')
                        mediapath.push(el.data.mediapath||'')
                    })
                    if(this.selectWx.wx_type=='10') {
                        data = {
                            sendUser:sendUser,
                            type:type,
                            content:content,
                            appid:appid,
                            orginid:orginid,
                            title:title,
                            desc:desc,
                            url:url,
                            iconurl:iconurl,
                            mediapath:mediapath
                        }
                    }else {
                        data = {
                            sendUser:sendUser,
                            type:type,
                            content:content,
                            mediapath:iconurl,
                        }
                    }

                }else{
                    this.forwardUserListChose.forEach(el=>{
                        sendUser.push(el.username)
                    })
                    if(this.selectWx.wx_type=='10') {
                        data = {
                            sendUser:sendUser,
                            type:[this.fowardItem.type],
                            content:[emoji.htmlToString(this.fowardItem.content||'')],
                            appid:[this.fowardItem.appid||''],
                            alias:[this.fowardItem.alias||''],
                            orginid:[this.fowardItem.orginid||''],
                            title:[this.fowardItem.title||''],
                            desc:[this.fowardItem.desc||''],
                            url:[this.fowardItem.url||''],
                            iconurl:[this.fowardItem.iconurl||''],
                            mediapath:[this.fowardItem.mediapath||'']
                        }
                    }else {
                        data = {
                            sendUser:sendUser,
                            type:[this.fowardItem.type],
                            content:[emoji.htmlToString(this.fowardItem.content)],
                            mediapath:[this.fowardItem.iconurl],
                        }
                    }
                }
                let msg
                if(this.selectWx.wx_type=='10') {
                    msg = {
                        cmd:2998,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:data
                    }
                }else {
                    msg = {
                        cmd:2601,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.selectContact.robot_username,
                        cmdData:data
                    }
                }
                this.$ws.sendMsgFun(msg)
                this.fowardModal = false;
                this.forwardUserListChose = [];
                if(this.fowardNum === '1'){
                    this.selectNum = [];
                    this.$refs["chatMsgItem"].forEach(el=>{
                        el.clearCheck()
                    })
                    this.selectNumflg = false
                    this.liveChatAction = false
                    this.forWardSelect = false;
                }
            },
            cancelForward(){
                this.selectNum  = []
                this.selectNumflg = false
                this.$refs["chatMsgItem"].forEach(el=>{
                    el.clearCheck()
                })
                this.forWardSelect = false;
            },
            forWardItem(item){
                if(item.index||item.index===0){
                    this.selectNum.splice(item.index,1)
                    this.selectNumflg = false
                }else{
                    if(!this.selectNum.length){
                        this.selectNum.push(item)
                    }else{
                        let flag = [];
                        flag = this.selectNum.filter(el =>{
                            return el.data.msgSvrId === item.data.msgSvrId
                        })
                        if(this.selectNum.length<5 && !flag.length){
                            this.selectNumflg = false
                            this.selectNum.push(item)
                            this.selectNum.length>4?this.selectNumflg = true:''
                        }else if(flag.length){
                             this.selectNum.splice(index,1)
                             this.selectNumflg = false
                        }
                    }
                }
            },
            forWradList(){
                this.fowardNum = '1';
                this.fowardModal = true;
                this.forwardUserKey = ''
                this.forwardListPage = 1
                this.forwardListScrollFlag = false
                this.getForwardList(true)
                setTimeout(_=>{
                    this.$refs.forwardListContent.scrollTop = 0
                    this.$refs.forwardListContent.addEventListener('scroll', () => {
                        if((this.$refs.forwardListContent.scrollHeight - this.$refs.forwardListContent.offsetHeight - this.$refs.forwardListContent.scrollTop)< 10
                            && !this.forwardListScrollFlag) {
                            this.getMoreForwardList()
                        }
                    }, false)
                },0)
            },
            forWardObj(item){
                this.fowardItem = item;
                this.liveChatAction = false
                this.forWardSelect = false;
                this.fowardModal = true;
                this.fowardNum = '2';

                this.forwardUserKey = ''
                this.forwardListPage = 1
                this.forwardListScrollFlag = false
                this.getForwardList(true)
                setTimeout(_=>{
                    this.$refs.forwardListContent.addEventListener('scroll', () => {
                        if((this.$refs.forwardListContent.scrollHeight - this.$refs.forwardListContent.offsetHeight - this.$refs.forwardListContent.scrollTop)< 10
                            && !this.forwardListScrollFlag) {
                            this.getMoreForwardList()
                        }
                    }, false)
                    this.$refs.forwardListContent.scrollTop = 0
                },0)
            },
            deleForward(val) {
                this.forwardUserListChose.splice(this.forwardUserListChose.indexOf(val),1)
            },
            cancelfowardModal(){
                this.craetGroupObj.chatUserListChose = []
                this.fowardModal = false;
            },
            rightClick(item) {
                console.log(item)
                if(item.type==1) {
                    this.$refs.chatMsgItem.forEach((el,index)=>{
                        if(index!=item.index) {
                            this.$refs.chatMsgItem[index].selectMsg = null
                        }
                    })
                }else if(item.type==2) {
                    this.$refs.chatMsgItem.forEach((el,index)=>{
                        if(index!=item.index) {
                            this.$refs.chatMsgItem[index].selectItem = null
                        }
                    })
                }
            },
            keyEvent(e) {
                this.$refs.at_room_user.keyEvent(e)
            },
            userAddInPosition(item,t) {
                let sel, range,html=item.nickname + ' ';
                if (t||this.getRange(),window.getSelection) {
                    !t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)),range.deleteContents();
                    sel = window.getSelection();//返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
                    let frag,node, lastNode;
                    if(range.createContextualFragment) {
                        frag = range.createContextualFragment(html)
                    } else {
                        let el = document.createElement("span");
                        el.innerHTML = html;
                        frag = document.createDocumentFragment()
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                    }
                    let ran = frag.lastChild;
                    range.insertNode(frag);
                    range.setStartAfter(ran);//重新定位range（光标位置）
                    sel.removeAllRanges();//清除所有选中
                    sel.addRange(range);//将新定位的range加入
                    let x = document.getElementById('divEdit')
                    let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
                    x.scrollTop < l && (x.scrollTop = l)
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            jumpPosition(type) {
                switch (type) {
                    case 'previous':
                        this.searchKeyNum+= 1
                        this.getSearchChatList(true,'','1')
                        break
                    case 'next':
                        if(this.searchKeyNum==1) {
                            this.$message.error('无下一条数据')
                            break
                        }
                        this.searchKeyNum-= 1
                        this.getSearchChatList(true,'','0')
                        break
                }
            },
            quitSearch() {
                //退出搜索并进入聊天页面
                this.$message.info('已退出搜索状态，请重新发送')
                this.emitEmpty()
                this.contactScrollFlag = false
                this.contactLastId = 0;

//                this.$axios({
//                    method: 'POST',
//                    url: '/index.php?r=uc/communication/talk',
//                    data:{
//                        searchKey:'',
//                        department_id:this.$store.state.user.user.department.id,
//                        last_id:this.contactLastId
//                    }
//                }).then(res=> {
//                    let udata = res.data
//                    if (udata.status == 1) {
//                        if(udata.data.contact_list.length == 0) {
////                            this.$message.warning('已加载完毕，无更多数据')
//                            this.searchChatList=[]
//                            this.$store.commit('liveChat/clearContactList')
//                            return
//                        }
//                        setTimeout(()=>{
//                            this.contactScrollFlag = false
//                        },2000)
//                        this.contactLastId = udata.data.last_id
//                        this.$store.commit('liveChat/setContactList',udata.data.contact_list)
//                        this.$store.commit('liveChat/insertContactList',this.selectContact)
//                        this.onSelect(udata.data.contact_list[0],true)
//                    }
//                });
            },
            getContctById(id) {
                let data ={}
                if(this.$route.query.type=='room') {
                    data = {
                        room_id:id,
                        department_id:this.$store.state.user.user.department.id,
                        username:this.$route.query.username,
                        wx_type:this.selectWx.wx_type
                    }
                } else if(this.$route.query.type=='friend') {
                    data = {
                        friends_id:id,
                        department_id:this.$store.state.user.user.department.id,
                        wx_type:this.selectWx.wx_type
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-now',
                    data:data
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        if(!!udata.data) {
                            !!udata.data.content&&(udata.data.content = emoji.stringToHtml(udata.data.content));
                           this.$store.commit('liveChat/insertContactList',udata.data);
                           this.onSelect(udata.data,true)
                        }
                    }
                })
            },
            receiveTransfeMoney(item) {
                let _this =this
                if(item.send_by!=0||(item.send_by==0&&item.chatTransferMoney.pay_sub_type==3&&item.chatTransferMoney.type!=0)) {
                    return
                }
                this.selectMsgOrder = {
                    id:item.id,
                    type:'1',
                    created:item.created,
                    content:item.content,
                    nickname:item.nickname,
                    avatar_url:item.avatar_url,
                    user_id:this.selectContact.id,
                    price:item.content.substring(1)
                }
//                this.getOrderDetails(this.selectMsgOrder.id)
                if(item.chatTransferMoney.pay_sub_type==3) {
                    return
                }
                let msg = {
                    cmd:2055,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        senderUsername:this.selectContact.friend_user_name,
                        transcAtionId:item.chatTransferMoney.transc_ation_id,
                        transferId:item.chatTransferMoney.transfer_id,
                        invalidTime:item.chatTransferMoney.invalid_time
                    }
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2055=function (wsMsg) {
                    console.log('2055',wsMsg)
                    if(wsMsg.status==2) {
                        if(wsMsg.callbackMsg=='收款成功') {
                            _this.$set(item.chatTransferMoney,'pay_sub_type',3)
                            _this.$store.commit('liveChat/insertContactList',_this.selectContact)
//                            let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
//                            let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
//                            let datekey = datetime.slice(0,10)
//                            let msg = {
//                                key:datekey,
//                                data:[{
//                                    id:_this.selectContact.robot_id,
//                                    robot_avatar_url:_this.selectContact.robot_avatar_url,
//                                    nickname:_this.selectContact.robot_nickname,
//                                    created:datetime,//从go获取
//                                    content:item.content,
//                                    type:'49',
//                                    send_by:_this.selectContact.robot_id,
//                                    chatTransferMoney:{
//                                        pay_sub_type:'3',
//                                        type:'0'
//                                    },
//                                    friend_user_name:_this.selectContact.friend_user_name
//                                }]
//                            }
//                            _this.$store.commit('liveChat/insertChatMsgList',msg)
                            _this.$set(_this.$store.state.liveChat.selectContact,'transfer_money',0)
                            _this.$message.success('领取成功')
//                            setTimeout(()=>{
//                                _this.$refs.contactList.scrollTop = 0
//                                _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
//                            },0)
                        }else if(wsMsg.callbackMsg!=''){
                            _this.$message.info(wsMsg.callbackMsg)
                        }
                    }else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }
            },
            receiveRedPacket(item) {
                let _this =this
                if(item.chatRedPacket.chat_type==10&&item.chatRedPacket.inner_type==1) {
                    this.selectMsgOrder = {
                        id:item.id,
                        type:'2',
                        created:item.created,
                        content:item.chatRedPacket.money/100,
                        nickname:item.nickname,
                        avatar_url:item.avatar_url,
                        user_id:item.chatRedPacket.chat_type==10?this.selectContact.id:'',
                        price:item.chatRedPacket.money/100
                    }
//                    this.getOrderDetails(this.selectMsgOrder.id)
                    return
                }
                let msg = {
                    cmd:2054,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        fromUsername:this.selectContact.friend_user_name,
                        nativeUrl:item.chatRedPacket.native_url
                    }
                }
                comConf.isOfflineRobot(this.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2054=function (wsMsg) {
                    if(wsMsg.status==2) {
                        if(wsMsg.callbackMsg=='红包打开成功') {
                            let flag = false
                            wsMsg.cmdData.receiveUsers.forEach(el=>{
                                if(el.username == wsMsg.fromClientId) {
                                    flag = true
                                    _this.$set(item.chatRedPacket,'money',el.money)
                                }
                            })
                            if(!flag) {
                                _this.$set(item.chatRedPacket,'money',0)
                                _this.$message.success('红包已领完')
                            } else {
                                _this.$message.success('红包打开成功')
                            }
                            if(item.chatRedPacket.chat_type==10&&item.chatRedPacket.inner_type==0) {
                                _this.selectMsgOrder = {
                                    id:item.id,
                                    type:'2',
                                    created:item.created,
                                    content:item.chatRedPacket.money/100,
                                    nickname:item.nickname,
                                    avatar_url:item.avatar_url,
                                    user_id:item.chatRedPacket.chat_type==10?_this.selectContact.id:'',
                                    price:item.chatRedPacket.money/100
                                }
//                                _this.getOrderDetails(_this.selectMsgOrder.id)
                            }
                            _this.$set(item.chatRedPacket,'inner_type',1)
                            _this.$set(_this.$store.state.liveChat.selectContact,'red_packet',0)
                        } else if(wsMsg.callbackMsg!=''){
                            _this.$message.info(wsMsg.callbackMsg)
                        }
                    }else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }
            },
            noHint(contact) {
                if(!contact.friend_user_name) {
                    return
                }
                let status = contact.no_hint=='1'?'0':'1'
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/no-hint',
                    data:{
                        name:contact.friend_user_name,
                        type:status,
                        chat_type:contact.chat_type,
                        robot_id:contact.robot_id,
                        wx_type:this.selectWx.wx_type
                    }
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$set(contact,'no_hint',status)
                        this.$forceUpdate()
                        this.moveGroupFlag = false;
                    }
                })
            },
            allRead() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/full-reading',
                    data:{
                        user_id:this.selectUser.id,
                        assistant_id:this.selectWx.id,
                        wx_type:this.selectWx.wx_type
                    }
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        this.liveChatManage.forEach(el=>{
                            if(el.id==this.selectUser.id) {
                                this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:el.num})
                            }
                        })
//                        this.$store.commit('liveChat/clearLiveChatManage',this.selectUser.id)
                        this.$store.commit('liveChat/clearWxListNum',this.selectWx)
                        this.$store.state.liveChat.contactList.forEach(el=>{
                            el.num = 0
                        })
                    }
                })
            },
            contactTopping() {
                if(!this.selectContact.friend_user_name) {
                    return
                }
                let status = this.selectContact.top_set=='1'?'0':'1'
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/top-set',
                    data:{
                        name:this.selectContact.friend_user_name,
                        type:status,
                        chat_type:this.selectContact.chat_type,
                        robot_id:this.selectContact.robot_id
                    }
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$set(this.$store.state.liveChat.selectContact,'top_set',status)
//                        this.$store.state.liveChat.selectContact.top_set = status
                        this.$store.commit('liveChat/insertContactList',this.selectContact)
                        this.$forceUpdate()
                    }
                })
            },
            getOrderDetails(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/money-order-edit',
                    data:{
                        id:id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data=='') {
                            this.orderDetail = {
                                cl_type:'1',
                                order_type:'10'
                            }
                            this.getGoodsClass()
                        }else {
                            this.orderDetail = udata.data
                            this.getGoodsClass()
                            if(this.orderDetail.cl_type=='1') {
                                this.getGoodsAll(udata.data.type_class)
                            }
                        }
                        this.orderModal =true
                    }
                });
            },
            saveOrderModal() {
                let data = {
                    cl_type:this.orderDetail.cl_type,
                    sk_id:this.selectMsgOrder.id,
                    type:'1',
                    friends_id:this.selectMsgOrder.user_id,
                    goods_id:this.orderDetail.goods_id,
                    num:this.orderDetail.num,
                    desc:this.orderDetail.desc,
                    order_type:this.orderDetail.order_type,
                    price:this.selectMsgOrder.price
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/money-order-add',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.orderModal = false
                        this.orderDetail = {
                            cl_type:'1',
                            order_type:'10'
                        }
                    }
                });
            },
            getGoodsClass() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/goods-class',
                    params:{department_id:this.$store.state.user.user.department.id,}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsClass = udata.data
                    }
                });
            },
            handleClassChange(value) {
                this.getGoodsAll(value)
            },
            getGoodsAll(classId) {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/class-goods-all',
                    params:{classId:classId}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsAll = udata.data
                        let flag =false
                        if(this.goodsAll.length==0) {
                            this.orderDetail.goods_id = ''
                            this.$message.warning('当前类别暂无商品，请先添加商品')
                            return
                        }
                        this.goodsAll.forEach(el=>{
                            if(el.id == this.orderDetail.goods_id) {
                                flag = true
                            }
                        })
                        !flag&&(this.orderDetail.goods_id = this.goodsAll[0].id)
                    }
                });
            },
            handleTagOkRoom() {
                let _this =this
                let welcomeId = []
                let replyId =[]
                this.welcomeList.forEach(el=>{
                    if(el.check) {
                        welcomeId.push(el.id)
                    }
                })
                this.replyList.forEach(el=>{
                    if(el.check) {
                        replyId.push(el.id)
                    }
                })
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/bind-room',
                    data:{
                        roomIds:[this.selectContact.id],
                        welcomeId:welcomeId[0],
                        replyId:replyId[0],
                        type:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.collocation_visible=false
                        this.$message.success('设置成功')
                        this.getContactInfo()
                    }
                });
            },
            handleTagChangeRoom(item,index,checked,type) {
                if(type=='1') {
                    this.welcomeList.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.welcomeList[index],'check',checked)
                } else if(type=='2') {
                    this.replyList.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.replyList[index],'check',checked)
                }
                this.$forceUpdate()
            },
            getWelcomeList() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/welcome-list',
                    params:{
                        departmentId:this.$store.state.user.user.department.id,
                        all:'1',
                        type:'20'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.welcomeList = udata.data.list
                        this.welcomeList.forEach(el=>{
                            if(!!this.welcome_own[0]&&el.id==this.welcome_own[0].id) {
                                this.$set(el,'check',true)
                            }
                        })
                    }
                });
            },
            getReplyList() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/reply-list',
                    params:{
                        departmentId:this.$store.state.user.user.department.id,
                        all:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.replyList = udata.data.list
                        this.replyList.forEach(el=>{
                            if(!!this.auto_reply_own[0]&&el.id==this.auto_reply_own[0].id) {
                                this.$set(el,'check',true)
                            }
                        })
                    }
                });
            },
            collocationOne() {
                if(!this.contactInfo.isInRoom) {
                    return
                }
                this.welcomeList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.replyList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.getWelcomeList()
                this.getReplyList()
                this.collocation_visible = true;
            },
            showRightNav() {
                if(document.documentElement.clientWidth<1322&&!this.showRightFlg) {
                    this.showRightFlg = true
                    this.showFlg = false
                }
            },
            scrollChatContent(e) {
                if(this.msgAtStatus || this.msgRetract) {
                    e.preventDefault()
                }
            },
            closeFriendEmoji(index) {
                this.$refs.emjCommon.forEach((el,index1)=>{
                    if(index1==index) {
                        this.$refs.emjCommon[index1].showEmojiFlag = true
                    }else {
                        this.$refs.emjCommon[index1].showEmojiFlag = false
                    }
                })
            },
            compositionstart() {
                this.inputChinese= false
            },
            compositionend() {
                this.inputChinese= true
            },
            initCapture() {
                if(isMacintosh())
                {
                    this.downloadUrl = 'http://www.ggniu.cn/download/CaptureInstall.dmg?';
                }
                this.captureObj = new NiuniuCaptureObject();
                this.captureObj.NiuniuAuthKey = "niuniu";
                //此处可以设置相关参数
                this.captureObj.TrackColor = rgb2value(255, 0, 0);
                this.captureObj.EditBorderColor = rgb2value(0, 0, 255);

                //设置工具栏的TOOLTIP
                //captureObj.ToolTipText = "tipRectangle|tipCircle|tipArrow|tipBrush|tipGlitter|tipMosaic|tipText|tipUndo|tipSave|tipCancel|tipFinish|Finish";

                //设置控件加载完成以及截图完成的回调函数
                this.captureObj.FinishedCallback = this.onCaptureFinishedCallback;
                this.captureObj.PluginLoadedCallback = this.pluginLoadedCallback;
                this.captureObj.VersionCallback = this.versionCallback;
                //初始化控件
                this.captureObj.InitNiuniuCapture();
            },
            /*此处是截图后的回调函数，用于将截图的详细信息反馈回来，你需要调整此函数，完成图像数据的传输与显示*/
            onCaptureFinishedCallback(type, x, y, width, height, info, content,localpath) {
                console.log('截图后回调type',type)
                if(type < 0){
                    //需要重新安装控件
                    this.showDownLoad('0');
                    return;
                }
                switch(type){
                    case 1:
//                        截图完成
                        this.uploadCaptureData(content, localpath);
                        break;
                    case 2:
//                        取消截图
                        break;
                    case 3:
//                        保存截图到本地
                        this.uploadCaptureData(content, localpath);
                        break;
                    case 4:
                        if(info =='0'){
//                            从剪贴板获取到了截图
                            this.uploadCaptureData(content, localpath);
                        }else {
//                            从剪贴板获取图片失败
                        }
                        break;
                }
            },
            uploadCaptureData(content, localpath){
                let savedPictureContent = content;
                //获取图片的扩展名

//                let pos = localpath.lastIndexOf('.');
//                let extendName = localpath.substr(pos + 1);
                this.fileList.push({
                    type:'image/jpeg',
                    src:'data:image/jpeg;base64,' + savedPictureContent,
                    from:'base64'
                })
//                this.$axios({
//                    method: 'POST',
//                    url: '/index.php?r=uc/user/upload',
//                    data:{
//                        type:1,
//                        img:'data:image/jpeg;base64,' + savedPictureContent
//                    }
//                }).then(res=>{
//                    let udata = res.data
//                    if (udata.status == 1) {
//                        this.sendObj.img_url = udata.data.path;
//                        this.sendImgFlag = true
//                    }
//                })
            },
            /*当控件成功加载后回调的的函数，您可以在此控制相应的UI显示*/
            pluginLoadedCallback(success) {
                if(success){
                    console.log('success',success)
                    this.$message.destroy()
                }
            },
            //用于返回控件的版本号
            versionCallback(ver) {
                console.log(ver)
                console.log(this.captureObj.Version)
            },
            startCapture(){
                let captureRet = this.captureObj.DoCapture("ecms截图"+ new Date().getTime() +".jpg", 0, 0, 0, 0, 0, 0);
                //从返回值来解析显示
                if(captureRet == 1){
                    this.showDownLoad('1');
                }
                else if(captureRet == 2){
                    this.showDownLoad('2');
                }
            },
//            提示需要安装控件
            showDownLoad(type) {
                const h = this.$createElement
                if(type!=2) {
                    this.$message.info(
                        h('div', {
                            style:{
                                display:'inline-block'
                            },
                            on:{
                                click: () => {
                                    this.$message.destroy()
                                }
                            }
                        },[
                            h('span','如果超过5秒无响应，请点此先'),
                            h('a',{
                                attrs:{
                                    href: this.downloadUrl + new Date().getTime()
                                },
                                on:{
                                    click: () => {
                                        this.$message.destroy()
                                    }
                                }
                            },'安装'),
                            h('span','截图插件')
                        ]),
                        8
                    )
                }else {
                    this.$message.info(
                        h('div', {
                            style:{
                                display:'inline-block'
                            },
                            on:{
                                click: () => {
                                    this.$message.destroy()
                                }
                            }
                        },[
                            h('span','正在截图中，如果超过5秒无响应，请点此先'),
                            h('a',{
                                attrs:{
                                    href: this.downloadUrl + new Date().getTime()
                                },
                                on:{
                                    click: () => {
                                        this.$message.destroy()
                                    }
                                }
                            },'安装'),
                            h('span','截图插件')
                        ]),
                        8
                    )
                }
            },
            getWxList() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/user-assistant',
                    data:{
                        user_id:this.selectUser.id,
                        type:'20'
                    }
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$store.commit('liveChat/setLiveChatManageChild',{list:udata.data,userId:this.selectUser.id})
                        this.$store.commit('liveChat/setWxList',udata.data)
                        if(udata.data.length!=0) {
                            if(!!this.$route.query.username) {
                                let flag = false
                                udata.data.forEach(el=>{
                                    if(el.username==this.$route.query.username) {
                                        flag = true
                                        this.getLiveList(el,1)
                                    }
                                })
                                !flag&&this.getLiveList(udata.data[0],0)
                            }else {
                                this.getLiveList(udata.data[0],0)
                            }
                        }else {
                            this.$store.commit('liveChat/setSelectWx',{})
                            this.userGroupList = [{id:'0',name:'全部'}]
                            this.$store.commit('liveChat/setSelectGroup',this.userGroupList[0])
                        }
                    }
                })
            },
//            选择对应分组
            userGroupClick(val) {
                this.userGroupList.forEach(el=>{
                    if(el.id==val.key) {
                        this.$store.commit('liveChat/setSelectGroup',el)
                    }
                })
                this.contactScrollFlag = false

                let num = 0
                this.wxList.forEach(el=>{
                    if(el.username==this.selectWx.username) {
                        num = el.num
                    }
                })
                this.$store.commit('user/reduceMenuBadge', {name:'聚合聊天',badge:num})
                this.$store.commit('liveChat/clearWxListNum',this.selectWx)
//                获取对应分组联系人
                this.getContactList(true,'1')
            },
//            获取用户分组列表
            getUserGroupList() {
                let data = {
                    user_id:this.selectUser.id,
                }
                if(this.selectWx.wx_type=='20') {
                    data.employee_id = this.selectWx.id
                }else {
                    data.assistant_id = this.selectWx.id
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/get-group',
                    data:data
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        this.userGroupList = udata.data
                        this.userGroupList.unshift({id:'0',name:'全部'})
                        this.$store.commit('liveChat/setSelectGroup',this.userGroupList[0])
//                        this.selectGroup = this.userGroupList[0]
                    }
                })
            },
            getMoveUserGroupList() {
                let data = {
                    user_id:this.selectUser.id,
                }
                if(this.selectWx.wx_type=='20') {
                    data.employee_id = this.selectWx.id
                }else {
                    data.assistant_id = this.selectWx.id
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/get-group',
                    data:data
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        this.moveUserGroupList = udata.data
                    }
                })
            },
            addUserGroupList() {
                if(this.checkGroupIsEdit()) {
                    this.moveUserGroupList.push({
                        id:'',
                        name:'',
                        editStatus:true
                    })
                }
            },
            checkGroupIsEdit() {
                let flag = true
                this.moveUserGroupList.forEach(el=>{
                    if(el.id==''||el.editStatus) {
                        flag = false
                    }
                })
                return flag
            },
            getPlatForm() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/sale/plat-form',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.platFormList = udata.data.list
                        this.queryParam.platFormId  = udata.data.list[0].id
                    }
                });
            },
            bind() {
                this.bindLoading = true
                if(this.selectWx.wx_type=='10') {
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/sale/bind-friends-order',
                        data:Object.assign(this.queryParam,{friends_id:this.contactInfo.id})
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success("已绑定！")
                            this.bindLoading = false
                            this.orderBindStatus = false
                            this.getBuyHistory()
                            this.queryParam = {
                                platFormId:3,
                                bindType:'1',
                                key:''
                            }
                        }else {
                            this.bindLoading = false
                        }
                    });
                }else {
                    this.$axios({
                        method: 'POST',
                        url: '/qiyewxapi/bindorder?',
                        data:{friend_id:this.contactInfo.id,cl_type:this.queryParam.platFormId,s_type:this.queryParam.bindType,s_key:this.queryParam.key,user_id:this.$store.state.user.user.user_id}
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success("已绑定！")
                            this.bindLoading = false
                            this.orderBindStatus = false
                            this.getBuyHistory()
                        }else {
                            this.bindLoading = false
                            this.$message.warning(udata.msg)
                        }
                    });
                }
            },
            disabledDate(current) {
                return current <  moment('1900-01-01','YYYY-mm-dd').startOf('day')
            },
            onChangeBirth(date, dateString) {
                this.contactInfo.birth = dateString;
            },
            formatNumberNum(num){
                let numStr = (num/100).toString();
                let res = ''
                if(numStr.indexOf('.') === -1){
                    res = numStr + '.00'
                }else{
                    res = numStr
                }
                return res
            },
        },
        created(){
            let _this = this
            this.$ws.cmd1 = function (msg) {
                if(!!_this.selectContact.id) {
                    _this.onSelect(_this.selectContact,true)
                }
            }
            this.managerList = JSON.parse(JSON.stringify(this.$store.state.user.manager));
            if(!!this.$route.query.user_id) {
                this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.menuSelect('聚合聊天')
                this.managerList.forEach((el,index)=>{
                    if(el.id==this.$route.query.user_id) {
                        this.$store.commit('liveChat/setSelectUser',el)
                    }
                })
            }else {
                let flag = false
                this.managerList.forEach((el,index)=>{
                    if(el.id==this.selectUser.id) {
                        flag = true
                        this.$store.commit('liveChat/setSelectUser',el)
                    }
                })
                !flag&&this.managerList.forEach((el,index)=>{
                    if(el.id==this.$store.state.user.user.user_id) {
                        this.$store.commit('liveChat/setSelectUser',el)
                    }
                })
            }
            let item = [];
            this.managerList.forEach((el,index)=>{
                if(el.id==this.$store.state.user.user.user_id || el.id==this.selectUser.id) {
                    item.push(el)
                    this.managerList.splice(index, 1);
                }
            })
            item.forEach(el=>{
                this.managerList.unshift(el)
            })
            this.$store.commit('liveChat/setLiveChatManage',this.managerList)
            this.getWxList()
            storage.store.get('sendContent')!=''&&(this.sendObj.text = storage.store.get('sendContent') || '')
            this.showRightNav()
            window.addEventListener('resize',this.showRightNav,false);
            this.$ws.cmd1005 = msg=>{
                if(msg.status==2&&msg.cmdData.username==this.selectContact.friend_user_name) {
                    setTimeout(_=>{
                        this.getContactInfo()
                    },2000)
                }
            }
        },
        beforeDestroy() {
            this.$store.commit('liveChat/setSearchStatus',false)

            this.$store.commit('liveChat/clearContactList')
            this.$store.commit('liveChat/clearChatMsgList')
            window.removeEventListener('resize',this.showRightNav,false)
            this.$ws.cmd1 = null
            this.$ws.cmd2043 = null
            this.$ws.cmd1005 = null
        },
        beforeRouteLeave: function(to, from , next){
            storage.store.set('sendContent',this.sendObj.text)
            next()
        }
    }
</script>
