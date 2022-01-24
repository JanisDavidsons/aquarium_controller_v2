export default (validator1, validator2) => {
    return (value) => validator1(value) || validator2(value);
}
