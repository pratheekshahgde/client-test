import { AgentMessage } from "@aries-framework/core";
import axios from "axios"
import type { AxiosResponse } from 'axios'
import { Attributes, message } from '@/studentData'
import { apiCall } from './BaseUrl'

export async function makeOobInviteMSg() {

  try {
    const response = await apiCall.post(`/oob/create-legacy-connectionless-invitation`, {
      "recordId": message.id,
      "message": message.message,
      "domain": "didcomm://aries_connection_invitation"
    })
    return response.data;
  } catch (error) {
    console.log('Invitation creation failed:', error);
    throw error; 
  }
}

export async function makeInvite() {
  try {
    const response = await apiCall.get(`/createInvite`);
    return response  //Should return invite url and out of band id
  } catch (error) {
    console.log('Invitation creation failed:', error);
    throw error; 
  }
}

export async function getConnectionId(outOfBandId: string) {
  const response = await apiCall.get(`/connections?outOfBandId=${outOfBandId}`);
  return response
}

export async function makeInvitationWMSG(attributeData:Attributes) {
  try {
    const response = await apiCall.post("/acceptCred", { attributeData })
    console.log(response.data)
    return response.data;
  } catch (error) {
    //console.log('Invitation creation failed:', error);
    throw error; // Re-throw the error for further handling if needed
  }
}