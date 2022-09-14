<div>
<div className='main'>
     <div className='container-fluid no-padding'>
      <div className={classes.root}>  
      
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
           <div className=''>
           <DashboardHeading
            text='Enquiries'
            /> 

            <div className='filter-enquiries'>
            <span className='active-filter'>NEW ENQUIRIES (5/15)</span>
            <span>OPEN ENQUIRIES (6)</span>
            <span>ARCHIVED (2)</span>
            </div>       
         
            </div> 
        
          <div className='admin-options-section'>                   
            <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
            <span className='yellow-dot'></span>
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 

           <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 
           
            </div>
         
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          
            <span onClick={() => this.handleDrawerClose()}>
            X
            </span>
         
    <div className='account-settings-area'>
    <div className='right-side-enq-heading'>
          Landlord doesn't want to return my deposit
        <span className='right-side-archive'>
           ARCHIVE
        </span>
    </div>
    <div className='row'>
        <div className='col-sm-1'>
            <div className='box-image'>          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>            
            </div>
            <div className='col-sm-11'>
            <div className='enq-name-date'>          
             <span className='enq-name-date-text'>Amanda Smith</span>
             <span className='enq-name-date-time'>08 July 2018, 19:12</span>
            </div>  

            <div className='enq-title'>
            I have reached the end of my tenancy and my landlord has not yet returned my deposit. 
            How do I go about getting my deposit back?
                </div>          
            </div>
            </div>
          </div>
      
        </Drawer>
      </div>
      </div>
      </div>
      <div className='main'>
     <div className='container-fluid no-padding'>
      <div className={classes.root}>  
      
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
           <div className=''>
           <DashboardHeading
            text='Enquiries'
            /> 

            <div className='filter-enquiries'>
            <span className='active-filter'>NEW ENQUIRIES (5/15)</span>
            <span>OPEN ENQUIRIES (6)</span>
            <span>ARCHIVED (2)</span>
            </div>       
         
            </div> 
        
          <div className='admin-options-section'>                   
            <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
            <span className='yellow-dot'></span>
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 

           <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 
           
            </div>
         
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          
            <span onClick={() => this.handleDrawerClose()}>
            X
            </span>
         
    <div className='account-settings-area'>
    <div className='right-side-enq-heading'>
          Landlord doesn't want to return my deposit
        <span className='right-side-archive'>
           ARCHIVE
        </span>
    </div>
    <div className='row'>
        <div className='col-sm-1'>
            <div className='box-image'>          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>            
            </div>
            <div className='col-sm-11'>
            <div className='enq-name-date'>          
             <span className='enq-name-date-text'>Amanda Smith</span>
             <span className='enq-name-date-time'>08 July 2018, 19:12</span>
            </div>  

            <div className='enq-title'>
            I have reached the end of my tenancy and my landlord has not yet returned my deposit. 
            How do I go about getting my deposit back?
                </div>          
            </div>
            </div>
          </div>
      
        </Drawer>
      </div>
      </div>
      </div>
      <div className='main'>
     <div className='container-fluid no-padding'>
      <div className={classes.root}>  
      
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
           <div className=''>
           <DashboardHeading
            text='Enquiries'
            /> 

            <div className='filter-enquiries'>
            <span className='active-filter'>NEW ENQUIRIES (5/15)</span>
            <span>OPEN ENQUIRIES (6)</span>
            <span>ARCHIVED (2)</span>
            </div>       
         
            </div> 
        
          <div className='admin-options-section'>                   
            <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
            <span className='yellow-dot'></span>
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 

           <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 
           
            </div>
         
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          
            <span onClick={() => this.handleDrawerClose()}>
            X
            </span>
         
    <div className='account-settings-area'>
    <div className='right-side-enq-heading'>
          Landlord doesn't want to return my deposit
        <span className='right-side-archive'>
           ARCHIVE
        </span>
    </div>
    <div className='row'>
        <div className='col-sm-1'>
            <div className='box-image'>          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>            
            </div>
            <div className='col-sm-11'>
            <div className='enq-name-date'>          
             <span className='enq-name-date-text'>Amanda Smith</span>
             <span className='enq-name-date-time'>08 July 2018, 19:12</span>
            </div>  

            <div className='enq-title'>
            I have reached the end of my tenancy and my landlord has not yet returned my deposit. 
            How do I go about getting my deposit back?
                </div>          
            </div>
            </div>
          </div>
      
        </Drawer>
      </div>
      </div>
      </div>
      <div className='main'>
     <div className='container-fluid no-padding'>
      <div className={classes.root}>  
      
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
           <div className=''>
           <DashboardHeading
            text='Enquiries'
            /> 

            <div className='filter-enquiries'>
            <span className='active-filter'>NEW ENQUIRIES (5/15)</span>
            <span>OPEN ENQUIRIES (6)</span>
            <span>ARCHIVED (2)</span>
            </div>       
         
            </div> 
        
          <div className='admin-options-section'>                   
            <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
            <span className='yellow-dot'></span>
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 

           <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 
           
            </div>
         
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          
            <span onClick={() => this.handleDrawerClose()}>
            X
            </span>
         
    <div className='account-settings-area'>
    <div className='right-side-enq-heading'>
          Landlord doesn't want to return my deposit
        <span className='right-side-archive'>
           ARCHIVE
        </span>
    </div>
    <div className='row'>
        <div className='col-sm-1'>
            <div className='box-image'>          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>            
            </div>
            <div className='col-sm-11'>
            <div className='enq-name-date'>          
             <span className='enq-name-date-text'>Amanda Smith</span>
             <span className='enq-name-date-time'>08 July 2018, 19:12</span>
            </div>  

            <div className='enq-title'>
            I have reached the end of my tenancy and my landlord has not yet returned my deposit. 
            How do I go about getting my deposit back?
                </div>          
            </div>
            </div>
          </div>
      
        </Drawer>
      </div>
      </div>
      </div>
      <div className='main'>
     <div className='container-fluid no-padding'>
      <div className={classes.root}>  
      
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
           <div className=''>
           <DashboardHeading
            text='Enquiries'
            /> 

            <div className='filter-enquiries'>
            <span className='active-filter'>NEW ENQUIRIES (5/15)</span>
            <span>OPEN ENQUIRIES (6)</span>
            <span>ARCHIVED (2)</span>
            </div>       
         
            </div> 
        
          <div className='admin-options-section'>                   
            <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
            <span className='yellow-dot'></span>
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 

           <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent()}>     
            <div className='col-sm-1'>
            <div className='box-image'>
          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>
            
            </div>
            <div className='col-sm-7'>          
            <div class="team-list-name">Landlord doesn't want to return my deposit    </div>
            <div class="team-list-para">Amanda Smith</div>   
            </div>
            <div className='col-sm-2'>
            <div class="team-list-para">25 March 2017</div>  
            <div class="team-list-para">8:12</div>  
          

            </div>
            <div className='col-sm-2 download-btns-sec'>
            <span>
           <img src = {require('../../assets/img/forward.png')} />
           </span>
           <span>
           <img src = {require('../../assets/img/archive.png')} />
           </span>
         
            </div>
          
            </div> 
           
            </div>
         
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          
            <span onClick={() => this.handleDrawerClose()}>
            X
            </span>
         
    <div className='account-settings-area'>
    <div className='right-side-enq-heading'>
          Landlord doesn't want to return my deposit
        <span className='right-side-archive'>
           ARCHIVE
        </span>
    </div>
    <div className='row'>
        <div className='col-sm-1'>
            <div className='box-image'>          
            <img src = {require('../../assets/img/user-dummy.png')} />
            </div>            
            </div>
            <div className='col-sm-11'>
            <div className='enq-name-date'>          
             <span className='enq-name-date-text'>Amanda Smith</span>
             <span className='enq-name-date-time'>08 July 2018, 19:12</span>
            </div>  

            <div className='enq-title'>
            I have reached the end of my tenancy and my landlord has not yet returned my deposit. 
            How do I go about getting my deposit back?
                </div>          
            </div>
            </div>
          </div>
      
        </Drawer>
      </div>
      </div>
      </div>
</div>