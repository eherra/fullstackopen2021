import React from 'react';
import { HospitalEntry } from '../types';
import { Item, Icon } from "semantic-ui-react";

const HospitalEntryValue: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <Item>
        <Icon size='huge' name='hospital' />
            <Item.Content>
                <Item.Header as='a'>{entry.date}</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>{entry.description}</Item.Description>
                <Item.Extra>{entry.discharge.date}: {entry.discharge.criteria}</Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default HospitalEntryValue;