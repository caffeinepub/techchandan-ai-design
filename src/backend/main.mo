import Map "mo:core/Map";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";



actor {
  // Authorization and Storage mixins
  let accessControlState = AccessControl.initState();
  include MixinStorage();
  include MixinAuthorization(accessControlState);

  // User profile type and storage
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // File storage management
  public type ReferenceFile = {
    filename : Text;
    contentType : Text;
    blob : Storage.ExternalBlob;
  };

  // Order system
  public type Order = {
    name : Text;
    email : Text;
    serviceType : Text;
    description : Text;
    timestamp : Int;
    referenceFile : ?ReferenceFile;
  };

  let orders = List.empty<Order>();

  // Public order submission function (anonymous access allowed)
  public shared ({ caller }) func submitOrder(
    name : Text,
    email : Text,
    serviceType : Text,
    description : Text,
    referenceFile : ?ReferenceFile,
  ) : async () {
    // TODO: Validate input data if needed (e.g., non-empty name)

    let order : Order = {
      name;
      email;
      serviceType;
      description;
      timestamp = Time.now();
      referenceFile;
    };
    orders.add(order);
  };

  // For admin use only: get all orders (contains personal data)
  public query ({ caller }) func getAllOrders() : async [Order] {
    // Only admin users can view all orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.toArray();
  };
};
