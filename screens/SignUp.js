import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import db from "../config";
import firebase from "firebase";

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
    confirmPassword:null
  };

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password) errors.push("password");

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        "Success!",
        "Your account has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Browse");
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  userSignUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\Check your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.email,
            address: this.state.address,
          });
          return Alert.alert("User Added Successfully", "", [
            {
               text: "Continue",
                onPress: () => {
                  navigation.navigate("Browse");
              }
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };



  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
              <View style={{flex:0.95}}>
                  <Text style={styles.label}>First Name </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"First Name"}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        firstName: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Last Name </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Last Name"}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        lastName: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Contact </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        contact: text,
                      });
                    }}
                  />

                  <Text style={styles.label}> Address </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Address"}
                    multiline={true}
                    onChangeText={(text) => {
                      this.setState({
                        address: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Email </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    onChangeText={(text) => {
                      this.setState({
                        email: text,
                      });
                    }}
                  />

                  <Text style={styles.label}> Password </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Confrim Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                  />
              </View>

            <View style={{flex:0.2,alignItems:'center'}}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <Text
               style={styles.cancelButtonText}
               onPress={() => {
                 this.setState({ isModalVisible: false });
               }}
              >
              Cancel
              </Text>
            </View>
        </ScrollView>
      </Modal>
    );
  };


  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View
          style={{ flex: 0.25}}
        >
        <View style={{flex:0.15}}/>

        </View>
        <View style={{ flex: 0.45 }}>

          <View style={styles.TextInput}>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            placeholderTextColor="gray"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
          />
          <TextInput
            style={[styles.loginBox,{marginTop:RFValue(15)}]}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          </View>
          <View style={{flex:0.5,  alignItems:"center",}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.email, this.state.password);  
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
 /* render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
        <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }*/
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
