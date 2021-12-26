import React from 'react';
import { HealthCheckEntry } from '../types';
import { Item, Icon } from "semantic-ui-react";

const getHeartColoredIcon = (rating: number) => {
    switch (rating) {
        case 0:
            return <Icon name='heart' color='green' />;
        case 1:
            return <Icon name='heart' color='yellow' />;
        case 2:
            return <Icon name='heart' color='red' />;
        default:
            return <Icon name='heart' color='black' />;
    }
};

const HealthCheckValue: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <Item>
            <Icon size='huge' name='user md' />

            <Item.Content>
                <Item.Header as='a'>{entry.date}</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>{entry.description}</Item.Description>
                {getHeartColoredIcon(entry.healthCheckRating)}
            </Item.Content>
        </Item>
    );
};

export default HealthCheckValue;