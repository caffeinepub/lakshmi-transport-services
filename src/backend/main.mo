import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";



actor {
  type Submission = {
    name : Text;
    email : Text;
    phone : Text;
    pickupLocation : Text;
    dropLocation : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compareByTimestamp(a : Submission, b : Submission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  type ShipmentMilestone = {
    title : Text;
    description : Text;
    timestamp : Text;
    completed : Bool;
  };

  type Shipment = {
    trackingId : Text;
    status : Text;
    origin : Text;
    destination : Text;
    estimatedDelivery : Text;
    currentLocation : Text;
    milestones : [ShipmentMilestone];
  };

  var submissionCounter = 0;
  var storageInitialized = false;
  let submissionMap = Map.empty<Nat, Submission>();
  let shipmentMap = Map.empty<Text, Shipment>();

  public shared ({ caller }) func submitForm(
    name : Text,
    email : Text,
    phone : Text,
    pickupLocation : Text,
    dropLocation : Text,
    message : Text,
  ) : async () {
    let submission : Submission = {
      name;
      email;
      phone;
      pickupLocation;
      dropLocation;
      message;
      timestamp = Time.now();
    };
    submissionMap.add(submissionCounter, submission);
    submissionCounter += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissionMap.values().toArray().sort(Submission.compareByTimestamp);
  };

  public shared ({ caller }) func initializeShipments() : async () {
    if (storageInitialized) { return () };
    putSampleShipments();
    storageInitialized := true;
  };

  public query ({ caller }) func trackShipment(trackingId : Text) : async ?Shipment {
    shipmentMap.get(trackingId);
  };

  public query ({ caller }) func getAllShipments() : async [Shipment] {
    shipmentMap.values().toArray();
  };

  public shared ({ caller }) func addShipment(
    trackingId : Text,
    status : Text,
    origin : Text,
    destination : Text,
    estimatedDelivery : Text,
    currentLocation : Text,
    milestones : [ShipmentMilestone],
  ) : async () {
    let shipment : Shipment = {
      trackingId;
      status;
      origin;
      destination;
      estimatedDelivery;
      currentLocation;
      milestones;
    };
    shipmentMap.add(trackingId, shipment);
  };

  public shared ({ caller }) func updateMilestone(
    trackingId : Text,
    milestoneIndex : Nat,
    completed : Bool,
  ) : async Bool {
    switch (shipmentMap.get(trackingId)) {
      case (null) { false };
      case (?shipment) {
        if (milestoneIndex >= shipment.milestones.size()) { false } else {
          let updatedMilestones = Array.tabulate(
            shipment.milestones.size(),
            func(i) {
              if (i == milestoneIndex) {
                {
                  title = shipment.milestones[i].title;
                  description = shipment.milestones[i].description;
                  timestamp = shipment.milestones[i].timestamp;
                  completed;
                };
              } else {
                shipment.milestones[i];
              };
            },
          );

          let updatedShipment : Shipment = {
            trackingId = shipment.trackingId;
            status = shipment.status;
            origin = shipment.origin;
            destination = shipment.destination;
            estimatedDelivery = shipment.estimatedDelivery;
            currentLocation = shipment.currentLocation;
            milestones = updatedMilestones;
          };
          shipmentMap.add(trackingId, updatedShipment);
          true;
        };
      };
    };
  };

  func putSampleShipments() {
    let lts001Milestones = [
      {
        title = "Picked Up";
        description = "Shipment collected from Mumbai";
        timestamp = "March 1, 2026";
        completed = true;
      },
      {
        title = "In Transit";
        description = "Shipment on the way to Chennai";
        timestamp = "March 2, 2026";
        completed = true;
      },
      {
        title = "At Chennai Hub";
        description = "Shipment arrived at Chennai";
        timestamp = "March 3, 2026";
        completed = true;
      },
      {
        title = "Delivered";
        description = "Shipment delivered to recipient";
        timestamp = "March 3, 2026";
        completed = true;
      },
    ];

    let lts002Milestones = [
      {
        title = "Picked Up";
        description = "Shipment collected from Delhi";
        timestamp = "March 5, 2026";
        completed = true;
      },
      {
        title = "In Transit";
        description = "Shipment en route to Bangalore";
        timestamp = "March 6, 2026";
        completed = true;
      },
      {
        title = "At Hyderabad Hub";
        description = "Shipment arrived at Hyderabad";
        timestamp = "March 7, 2026";
        completed = false;
      },
      {
        title = "Out for Delivery";
        description = "Shipment on the way to final destination";
        timestamp = "March 8, 2026";
        completed = false;
      },
    ];

    let lts003Milestones = [
      {
        title = "Picked Up";
        description = "Shipment collected from Kolkata";
        timestamp = "March 4, 2026";
        completed = true;
      },
      {
        title = "In Transit";
        description = "Shipment moving towards Pune";
        timestamp = "March 5, 2026";
        completed = true;
      },
      {
        title = "At Pune City";
        description = "Shipment arrived in Pune";
        timestamp = "March 6, 2026";
        completed = true;
      },
      {
        title = "Out for Delivery";
        description = "Shipment being delivered to recipient";
        timestamp = "March 6, 2026";
        completed = false;
      },
    ];

    let lts001 : Shipment = {
      trackingId = "LTS001";
      status = "Delivered";
      origin = "Mumbai";
      destination = "Chennai";
      estimatedDelivery = "March 3, 2026";
      currentLocation = "Chennai Hub";
      milestones = lts001Milestones;
    };

    let lts002 : Shipment = {
      trackingId = "LTS002";
      status = "In Transit";
      origin = "Delhi";
      destination = "Bangalore";
      estimatedDelivery = "March 8, 2026";
      currentLocation = "Hyderabad Transit Hub";
      milestones = lts002Milestones;
    };

    let lts003 : Shipment = {
      trackingId = "LTS003";
      status = "Out for Delivery";
      origin = "Kolkata";
      destination = "Pune";
      estimatedDelivery = "March 6, 2026";
      currentLocation = "Pune City";
      milestones = lts003Milestones;
    };

    shipmentMap.add("LTS001", lts001);
    shipmentMap.add("LTS002", lts002);
    shipmentMap.add("LTS003", lts003);
  };
};
