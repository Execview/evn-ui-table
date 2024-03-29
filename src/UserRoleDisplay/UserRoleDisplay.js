import React, { useState } from 'react';
import ImageDisplay from '../cells/ImageDisplay/ImageDisplay.js';
import './CircleUser.css';
import AssignUsers from './AssignUsers.js';
import { RightClickMenuWrapper } from '@execview/reusable';

const UserRoleDisplay = (props) => {
	const [open, setOpen] = useState(false);
	const getUserProfile = (user) => {
		return props.userProfiles[user];
	};

	const getAllUserProfileKeys = () => {
		return Object.keys(props.userProfiles);
	};
	const data = props.data || [];
	const userImages = data.map(d => getUserProfile(d.user).image);
	return (
		<div className="user-cell" onClick={() => setOpen(true)}>
			<ImageDisplay data={userImages} style={props.style} />
			<RightClickMenuWrapper open={open} setOpen={setOpen} onLeftClick takeParentLocation slideBox={0} moveBox={[150,0]} >
				<AssignUsers
					type={props.type || 'activity'}
					assignedUsers={data}
					getUserProfile={getUserProfile}
					getAllUserProfileKeys={getAllUserProfileKeys}
					style={props.style}
					closeMenu={() => setOpen(false)}
					onValidateSave={props.onValidateSave}
				/>
			</RightClickMenuWrapper>
		</div>
	);
};

export default UserRoleDisplay;
