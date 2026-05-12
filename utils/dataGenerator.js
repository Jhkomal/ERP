/**
 * Utility to generate unique test data for each automation script run
 */

class DataGenerator {
  /**
   * Generate a unique email address based on company name in yopmail.com format
   * @param {string} companyName - The company name to base the email on
   * @returns {string} Unique email address
   */
  static generateUniqueEmail(companyName) {
    const randomNum = Math.floor(Math.random() * 100);
    const emailName = companyName.toLowerCase().replace(/\s+/g, '-');
    return `${emailName}${randomNum}@yopmail.com`;
  }

  /**
   * Generate a random company name without numbers
   * @returns {string} Random company name
   */
  static generateUniqueCompanyName() {
    const adjectives = ['Swift', 'Cloud', 'Digital', 'Smart', 'Nexus', 'Apex', 'Prime', 'Quantum', 'Zenith', 'Fusion', 'Nova', 'Pulse', 'Vertex', 'Summit', 'Horizon'];
    const nouns = ['Systems', 'Solutions', 'Technologies', 'Innovations', 'Ventures', 'Labs', 'Hub', 'Works', 'Pro', 'Plus', 'Max', 'Elite', 'Group', 'Corp', 'Dynamics'];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${randomAdjective} ${randomNoun}`;
  }

  /**
   * Generate test data with unique email and company name
   * @returns {object} Test data object with email, company name, and fixed password
   */
  static generateTestData() {
    const companyName = this.generateUniqueCompanyName();
    
    return {
      email: this.generateUniqueEmail(companyName),
      companyName: companyName,
      password: 'Password@123',
    };
  }
}

export default DataGenerator;
