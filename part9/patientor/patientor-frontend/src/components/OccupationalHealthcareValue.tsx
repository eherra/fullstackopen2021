import React from 'react';
import { OccupationalHealthcareEntry} from '../types';
import { Item, Icon} from "semantic-ui-react";

const OccupationalHealthcareValue: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <Item>
        <Icon size='huge' name='stethoscope' />

        <Item.Content>
            <Item.Header as='a'>{entry.date} <b>{entry.employerName}</b></Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>{entry.description}</Item.Description>
            {entry.sickLeave &&
                <Item.Extra>Sick leave from: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Item.Extra>}
        </Item.Content>
    </Item>
    );
};

export default OccupationalHealthcareValue;