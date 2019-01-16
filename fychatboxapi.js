const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var db = require('../config/db');

var connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

function fyChatBoxAPI(req, res) {
    console.log('fychat-box in action')
    var date = new Date();
    connection.query("CREATE TABLE IF NOT EXISTS `ChatBox`\
(   `id` int(11) NOT NULL AUTO_INCREMENT,\
    `senderID` varchar(30) NOT NULL,\
    `receiver` varchar(75) DEFAULT NULL,\
    `sender`  varchar(75) DEFAULT NULL,\
    `msg`  varchar(500) DEFAULT NULL,\
    `action` tinyint(4) NOT NULL,\
    `date` varchar(20) DEFAULT NULL,\
    PRIMARY KEY (`id`)\
)   ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1", (err, rows) => {
        if (!err) {
            console.log("table created");
        } else {
            console.log(err + "\ntable already exist");
        }
    })
    if (req.body.action == 'chatStyle') {
        var chatStyle = `<style>
        .bg-head {
            background-color: blanchedalmond;
        }
        
        .bg-green {
            background-color: green;
        }
        
        .white {
            color: aliceblue;
        }
        
        #fychatbox {
            padding: 0px;
            margin: 0px;
            font-family: 'Karla', sans-serif;
            color: #FFF;
        }
        
        h1 {
            text-align: center;
        }
        
        .messages::-webkit-scrollbar {
            width: 8px
        }
        
        .messages::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0px 2px 2px 0px;
        }
        
        .messages::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.5);
        }
        
        .fychatbox-container {
            /* margin: 20px auto; */
            border: 1px solid rgba(0, 0, 0, 0.25);
            max-width: 600px;
            background: #4772C1;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
            border-radius: 3px;
            animation: flyin 0.75s;
        }
        
        .fychatbox-container .messages {
            height: 250px;
            /* margin: 20px; */
            background: rgba(0, 0, 0, 0.6);
            overflow-y: scroll;
            border-radius: 2px;
        }
        
        .fychatbox-container .messages .message {
            padding: 10px;
            animation: fade 0.25s;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .fychatbox-container .input-chat-sender {
            display: flex;
            margin: 0px 20px 20px 20px;
        }
        
        .fychatbox-container .input-chat-sender .btn-chat-sender,
        .fychatbox-container .input-chat-sender .emoji-btn {
            height: 40px;
            line-height: 40px;
            width: 75px;
            text-align: center;
            background: #222;
            border-radius: 2px;
            margin-left: 10px;
            position: relative;
            cursor: pointer;
        }
        
        .fychatbox-container .input-chat-sender .btn-chat-sender:hover {
            background: #333;
            cursor: pointer;
        }
        
        .fychatbox-container .input-chat-sender input {
            border-radius: 2px;
            margin-right: 0px;
            border: none;
            width: 100%;
            flex: 1;
            padding: 0px 20px;
            background: #222;
            color: white;
            font-weight: 600;
            outline: none;
        }
        
        @keyframes fade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes flyin {
            from {
                transform: translateY(400px);
                opacity: 0;
            }
            to {
                transform: translateY(0px);
                opacity: 1;
            }
        }
        
        .chat-sender,
        .chat-receiver {
            display: inline-block;
            clear: both;
            padding: 20px;
            border-radius: 30px;
            margin-bottom: 2px;
            font-family: Helvetica, Arial, sans-serif;
            width:auto;
            max-width:87%;
        }
        
        .chat-receiver {
            background: #eee;
            color: #515151;
            float: left;
        }
        
        .chat-sender {
            float: right;
            background: #0084ff;
            color: #fff;
        }
        
        .chat-receiver+.chat-receiver {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        
        .chat-sender+.chat-sender {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        
        .chat-sender {
            border-bottom-right-radius: 0px;
        }
        
        .chat-receiver {
            border-bottom-left-radius: 0px;
        }
        
        .chat-sender:last-of-type {
            border-bottom-right-radius: 30px;
        }
        
        .chat-receiver:last-of-type {
            border-bottom-left-radius: 30px;
        }
        
        .emoji-popup {
            position: absolute;
            top: -140px;
            left: -50px;
            height: 130px;
            width: 194px;
            background: #999;
            border-radius: 2px;
            text-align: left;
            overflow-y: auto;
            opacity: 0;
            pointer-events: none;
            transition: all 0.25s;
            box-sizing: border-box;
        }
        
        .emoji-wrapper {
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;
        }
        
        .emoji-popup .emoji-img {
            margin: auto;
            width: 30px;
            height: 30px;
            text-align: center;
            border-radius: 5px;
        }
        
        .emoji-popup .emoji-img:hover {
            background: rgba(0, 0, 0, 0.25);
        }
        
        .emoji-btn:after {
            content: '';
            position: absolute;
            border: 10px solid transparent;
            border-top: 10px solid #999;
            top: -10px;
            left: 30px;
            transition: all 0.25s;
            opacity: 0;
        }
        
        .emoji-btn.open:after {
            opacity: 1;
        }
        
        .emoji-btn.open .emoji-popup {
            opacity: 1;
            pointer-events: initial;
        }`;
        res.json({
            success: true,
            data: chatStyle
        })

    } else if (req.body.action == 'chatTemp') {
        var chatTemp = ` <div id="fychatbox" class="" style="position:fixed;right:20px;bottom:0;width:auto !important;min-width:300px;max-width:500px;height:auto;max-height:630px; min-height: 430px;z-index:22223;">
        <div id="fychatbox-inner" class="bg-green" style="display:none;">
            <h4 style="background: #191A1D;padding:10px !important;">Chat with us! <span style="float: right;font-size:25px;" onclick="document.getElementById('fychatbox-logo').style.display='initial';document.getElementById('fychatbox-inner').style.display='none'">&nbsp;&nbsp;-&nbsp;</span></h4>
            <div id="fychatbox-online-user">

            </div>
            <div class="fychatbox-container">
                <div class="messages">
                    <div class="message" style="text-align: center;"><span style="padding:10px !important;">welcome! to our online support</span></div>
                </div>
                <div class="input-chat-sender">
                    <input type="text" placeholder="Type message here!" />
                    <div class="emoji-btn open">:]
                        <div class="emoji-popup">
                            <div class="emoji-wrapper"></div>
                        </div>
                    </div>
                    <div class="btn-chat-sender">Send</div>
                </div>
            </div>
        
        </div>
        <div id="fychatbox-logo" onclick="document.getElementById('fychatbox-inner').style.display='initial';document.getElementById('fychatbox-logo').style.display='none'">
            <div style="position:absolute;right:0;bottom:5px;background-color: #777ff5; border-radius: 50%;text-align:center;">
                <img style="width:100px;height:100px; border-radius: 50%; " src="https://www.1stfinancialfcu.org/wp-content/uploads/2017/11/1stFinancial_secureChat_login_icon_1.png">
            </div>
        </div>
        </div>`;
        res.json({
            success: true,
            data: chatTemp
        })

    } else if (req.user) {
        if (req.body.action == 'list') {
            connection.query("select * from ChatBox where senderID = '" + req.user.AppUserID + "'", (err, rows) => {
                if (rows.length > 0) {
                    var result = [];
                    for (var i in rows) {
                        var date = new Date(rows[i].date);
                        var hours = date.getHours()
                        if (hours > 12) {
                            rows[i].time = hours + ":" + date.getMinutes() + "pm"
                        } else {
                            rows[i].time = hours + ":" + date.getMinutes() + "am"
                        }
                        rows[i].date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
                        result.push(rows[i])
                    }
                    res.json({
                        success: true,
                        data: result
                    })
                } else {
                    res.json({
                        success: false
                    })
                }
            });
        } else if (req.body.action == 'user') {
            res.json({
                success: true,
                data: {
                    AppUserActivate: req.user.AppUserActivate,
                    AppUserActive: req.user.AppUserActive,
                    AppUserAdmin: req.user.AppUserAdmin,
                    AppUserCreateDate: req.user.AppUserCreateDate,
                    AppUserDescription: req.user.AppUserDescription,
                    AppUserDriver: req.user.AppUserDriver,
                    AppUserEmail: req.user.AppUserEmail,
                    AppUserID: req.user.AppUserID,
                    AppUserOnline: req.user.AppUserOnline,
                    AppUserPhone: req.user.AppUserPhone,
                    AppUserService: req.user.AppUserService,
                    AppUserUsername: req.user.AppUserUsername
                }
            })
        } else if (req.body.action == 'send') {
            connection.query("INSERT INTO `ChatBox` (`senderID`,`sender`,`receiver`,`msg`,`date`) VALUES ('" + req.user.AppUserID + "','" + req.user.AppUserUsername + "','admin','" + req.body.msg + "','" + Date.now() + "')", (err, rows) => {
                if (rows.affectedRows > 0) {
                    res.json({
                        success: true
                    })
                } else {
                    res.json({
                        success: false
                    })
                }
            });
        } else {
            res.json({
                success: true,
                data: "blaablaa"
            })
        }
    } else if (req.body.action == 'send') {
        connection.query("INSERT INTO `ChatBox` (`senderID`,`sender`,`receiver`,`msg`,`date`) VALUES ('1000000000','anonymous','admin','" + req.body.msg + "','" + Date.now() + "')", (err, rows) => {
            if (rows.affectedRows > 0) {
                res.json({
                    success: true
                })
            } else {
                res.json({
                    success: false
                })
            }
        });
    } else if (req.body.action == 'list') {
        res.json({
            success: false
        })
    } else {
        res.json({
            success: false,
            data: "user not login"
        })
    }

}
router.use((req, res, next) => {
    fyChatBoxAPI(req, res);
});
module.exports = router;