

//width heigth
//w = 3200, h = 1520

//player
//w = h = 60

//Options
_spawn                      = true;
_widthPlayer                = document.getElementById("player").offsetWidth;
_ticksForRound              = 1000;
_gameSpeed                  = 25; //start
_score                      = 0;
_minGamespeed               = 5;
_maxGamespeed               = 20;
_playerSpeed                = 15;
_ballSpeed                  = 18;
_fastBallSpeed              = 60;
_godmode                    = false;
_fastBallRegneration        = 5;
_fastBallAmount             = 4;
_followBallSpeed            = 60;
_followBallRegneration      = 8;
_hpMax                      = 1000;
_hpReg                      = 10; //every x sec
_damageIncrease             = 1; //every 5 sec
_speedTimeIncreaseStand     = 1;
_rushModeEnergyCost         = 0.05;
_rushModeBoost              = 3;
_teleportDistance           = 40;//standart speed * value
_teleportEnergyCost         = 5;
_teleportCooldown           = 1;
_shootSpeed                 = 10; //Jump 3 time at once
_maxShots                   = 6;
_infinityBallSpeed          = 25;
_infinityAmount             = 1;
_powerupLifetime            = 10;
_powerupRandom              = 10;
_debugString                = "round, spawn, amount, chance";
_bounceHorizontal           = 0;
_bounceVertical             = 0;
_pushBallSpeed              = 15;
_playerStun                 = 0;
_inviBallSpeed              = 10;
_contactBallSpeed           = 30;
_ballG2Speed                = 18;
_CellBallSpeed              = 15;
_playerSize                 = 60;
_standardHeal               = true;
_additionalHeal             = true;


//runtime
_live                       = true;
_time                       = 0;
_round                      = 0;
_damage                     = 35;
_hp                         = 250;//250
_hpAmount                   = 60;
_lastMove                   = false;
_lastTelepor                = -200;
_mouseclickRight            = false;
_mouseX                     = 0;
_mouseY                     = 0;
_hpDecrementPause           = false;
_lastReg                    = 0;
_lastKeyInput               = "";
_fps                        = 0;
_fpsWithoutCalc             = 0;
_fpsCalcDiffernce           = 0;
_windX                      = 0;
_windY                      = 0;
_menue                      = false;
_posTopPlayer               = 0;
_posLeftPlayer              = 0;
_lastDamageSound            = -100000;
_lastBounceSound            = -100000;
_playerSpeedReduce          = 0;
_lastSpawn                  = -100000;

//effects

_glow = 0;
_lastDamage = -100;


//debug

_DB_lastDamage = [];