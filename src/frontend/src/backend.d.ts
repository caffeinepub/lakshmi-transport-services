import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ShipmentMilestone {
    title: string;
    completed: boolean;
    description: string;
    timestamp: string;
}
export type Time = bigint;
export interface Submission {
    name: string;
    email: string;
    dropLocation: string;
    message: string;
    timestamp: Time;
    phone: string;
    pickupLocation: string;
}
export interface Shipment {
    status: string;
    destination: string;
    origin: string;
    estimatedDelivery: string;
    trackingId: string;
    currentLocation: string;
    milestones: Array<ShipmentMilestone>;
}
export interface backendInterface {
    addShipment(trackingId: string, status: string, origin: string, destination: string, estimatedDelivery: string, currentLocation: string, milestones: Array<ShipmentMilestone>): Promise<void>;
    getAllShipments(): Promise<Array<Shipment>>;
    getAllSubmissions(): Promise<Array<Submission>>;
    initializeShipments(): Promise<void>;
    submitForm(name: string, email: string, phone: string, pickupLocation: string, dropLocation: string, message: string): Promise<void>;
    trackShipment(trackingId: string): Promise<Shipment | null>;
    updateMilestone(trackingId: string, milestoneIndex: bigint, completed: boolean): Promise<boolean>;
}
