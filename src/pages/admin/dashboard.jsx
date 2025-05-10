import React, { useState } from 'react';
import Select from '../../components/Select';
import styles from './dashboard.module.scss';
import TabsWithTable from './TabsWithTable';
import Grid from '@mui/material/Grid2';

function Dashboard() {
	const [branches, setBranches] = useState(["All Branches", "Cardiology", "Therapy", "Dermatology"]);
  return (
    <>
		<div className={styles.dashboard}>
			{ 	branches.length && 
				<Grid container spacing={2} justifyContent="flex-end" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '10px 20px 10px 0'}}>
					<Grid size={3}>
						<Select 
							inputId="input-department"
							selectId="select-department"
							label="Department"
							list={branches}
							size="small"
						/>
					</Grid>
				</Grid>
			}
			<div className={styles.dashboard__tabData}>
				<TabsWithTable/>
			</div>
		</div>
    </>
  );
}

export default Dashboard;