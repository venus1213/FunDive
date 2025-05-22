import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/auth';

export const HomeScreen = () => {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcome}>
            ようこそ、{user?.displayName || 'ゲスト'}さん
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>おすすめのプロジェクト</Text>
          <View style={styles.projectList}>
            {/* プロジェクトカードをマップで表示 */}
            <View style={styles.projectCard}>
              <Text style={styles.projectTitle}>AIを活用した教育プラットフォーム</Text>
              <Text style={styles.projectDescription}>
                最新のAI技術を活用して、個々の学習者に最適化された学習体験を提供します。
              </Text>
            </View>
            <View style={styles.projectCard}>
              <Text style={styles.projectTitle}>サステナブルなモビリティサービス</Text>
              <Text style={styles.projectDescription}>
                環境に優しい移動手段を提供する次世代のモビリティサービスを開発中です。
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最近の活動</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>新しいプロジェクトが追加されました</Text>
              <Text style={styles.activityTime}>2時間前</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>メッセージが届いています</Text>
              <Text style={styles.activityTime}>5時間前</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  projectList: {
    gap: 16,
  },
  projectCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
}); 