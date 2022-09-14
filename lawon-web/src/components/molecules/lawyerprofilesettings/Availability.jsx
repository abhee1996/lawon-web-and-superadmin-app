import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, IconButton, Tooltip } from '@material-ui/core';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { Delete, AddCircle } from '@material-ui/icons';
import { Button, TYPES } from '../../atoms/YellowButton';

const days = moment.weekdays();

const Availability = ({ getLawyerAvailability, availability, saveLawyerAvailability }) => {
  const [lawyerAvailability, setLawyerAvailability] = useState([]);
  const availableDays = days.filter((day) => !lawyerAvailability.some(({ day: d }) => d === day ));

  useEffect(() => {
    getLawyerAvailability();
  }, []);

  useEffect(() => {
    setLawyerAvailability(availability);
  }, [availability]);

  const handeDeleteTime = (index) => {
    lawyerAvailability.splice(index, 1);
    setLawyerAvailability([ ...lawyerAvailability ]);
  }

  const onChangeDay = (value, index) => {
    lawyerAvailability[index].day = value;
    setLawyerAvailability([ ...lawyerAvailability ]);
  }

  const onChangeStartTime = (value, index) => {
    lawyerAvailability[index].startTime = value.format('HH:mm:ss');
    setLawyerAvailability([ ...lawyerAvailability ]);
  }

  const onChangeEndTime = (value, index) => {
    lawyerAvailability[index].endTime = value.format('HH:mm:ss');
    setLawyerAvailability([ ...lawyerAvailability ]);
  }

  const handeSaveAvailability = () => {
    saveLawyerAvailability({ availability: lawyerAvailability });
  }

  const addSlot = () => {
    lawyerAvailability.push({
      startTime: '06:00:00',
      endTime: '18:00:00',
      day: availableDays.find(x => x)
    });

    setLawyerAvailability([ ...lawyerAvailability ]);
  }

  return (
    <div>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <div style={{ marginTop: '20px' }}>
          {lawyerAvailability.map(({ startTime, endTime, day }, index) => {

            const daysOptions = days.map((day) => {
              const isAdded = lawyerAvailability.some(({ day:d }) => d === day);
              return <MenuItem value={day} disabled={isAdded}>{day}</MenuItem>;
            });

            return (
              <div className='col-sm-12 no-padding time-avalaiblity' key={index}>
                <div className='col-sm-3 aval-day right-side-dark-para'>
                  <FormControl
                    size='small'
                    style={{ width: '100%' }}>
                    <InputLabel id='day-label'>Day</InputLabel>
                    <Select
                      value={day || ''}
                      onChange={({ target: { value }}) => onChangeDay(value, index)}
                      MenuProps={{
                        PaperProps: {
                          style: { width: 110 }
                        }
                      }}
                      labelId='day-label'
                      label='Day'>
                      {daysOptions}
                    </Select>
                  </FormControl>
                </div>
                <div className='col-sm-7'>
                  <div className='avl-time form-area col-sm-6'>
                    <TimePicker
                      size='small'
                      label='From'
                      style={{ width: '100%' }}
                      disableFuture
                      value={moment(startTime, 'HH:mm:ss')}
                      onChange={(value) => onChangeStartTime(value, index)}
                    />
                  </div>

                  <div className='avl-time form-area col-sm-6'>
                    <TimePicker
                      size='small'
                      label='To'
                      style={{ width: '100%' }}
                      disableFuture
                      value={moment(endTime, 'HH:mm:ss')}
                      onChange={(value) => onChangeEndTime(value, index)}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  {(lawyerAvailability.length !== 1)
                    && (
                      <Tooltip title='Remove'>
                        <IconButton
                          size='small'
                          onClick={() => handeDeleteTime(index)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    )}
                </div>
              </div>
            )
          })}
        </div>
        {(availableDays.length !== 0)
          && (
            <div style={{ marginLeft: '10px' }}>
              <Tooltip title='Add Availability Slots'>
                <IconButton
                  size='small'
                  onClick={addSlot}>
                  <AddCircle />
                </IconButton>
              </Tooltip>
            </div>
          )}

        <div className='float-right pt40'>
          <Button
            text='Save Changes'
            type='button'
            onClick={handeSaveAvailability}
            buttonType={TYPES.Generic}
          />
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default Availability
